(ns lt.plugins.clojure.collapsible-exception
  (:require [lt.util.dom :as dom]
            [lt.object :as object]
            [lt.objs.editor :as ed]
            [lt.objs.notifos :as notifos]
            [crate.binding :refer [bound]])
  (:require-macros [lt.macros :refer [defui behavior]]))

(def ^:private ^:const NOT_FOUND -1)

(defn truncate
  "truncate a string at newline or at 100 characters long"
  [text]
  (when-not (empty? text)
    (if (= NOT_FOUND (.indexOf text "\n"))
      (subs text 0 100); take 100 characters
      (first (clojure.string/split-lines text)))))

(defn ->collapse-class [this summary]
  (str "inline-exception result-mark"
        (when (:open this) " open")))

(defui collapsible-exception-UI [this info]
  (let [stacktrace (:result info)
        summary    (str (:summary info) " ...")]
    [:span {:class (bound this #(->collapse-class % summary))
            :style "background: #73404c; color: #ffa6a6;
                    max-width:initial; max-height:initial"}
     [:span.truncated summary]
     [:span.full stacktrace]])
  :mousewheel (fn [e] (dom/stop-propagation e))
  :click      (fn [e] (dom/prevent e)
                      (object/raise this :click))
  :contextmenu (fn [e] (dom/prevent e)
                       (object/raise this :menu! e))
  :dblclick    (fn [e] (dom/prevent e)
                       (object/raise this :double-click)))

(object/object* ::collapsible-exception
                :triggers #{:click :double-click :clear!}
                :tags #{:inline :collapsible.exception}
                :init
  (fn [this info]
    (when-let [ed (ed/->cm-ed (:ed info))]
      (let [content (collapsible-exception-UI this info)]
        (object/merge! this (assoc info
            :widget (ed/line-widget (ed/->cm-ed (:ed info)) (:line (:loc info))
                                    content, {:coverGutter false})))
        content))))

(behavior ::expandable-exceptions
          :triggers #{:editor.exception.collapsible}
          :reaction
  (fn [this summary stack loc]
    (let [ed      (:ed @this)
          line    (ed/line-handle ed (:line loc))
          ex-obj  (object/create ::collapsible-exception
                                 {:ed this, :result stack,
                                  :summary summary
                                  :loc loc, :line line})]
      (when-let [prev (get (@this :widgets) [line :inline])]
        (when (:open @prev) (object/merge! ex-obj {:open true}))
        (object/raise prev :clear!))
      (when (:start-line loc)
        (doseq [widget (map #(get (@this :widgets) [(ed/line-handle ed %) :inline])
                             (range (:start-line loc) (:line loc)))
                :when widget]
          (object/raise widget :clear!)))
      (object/update! this [:widgets] assoc [line :inline] ex-obj))))


(behavior ::clj-expandable-exception
          :triggers #{:editor.eval.clj.exception}
          :reaction (fn [obj res passed?]
                      (when-not passed?
                        (notifos/done-working ""))
                      (let [meta (:meta res)
                            loc {:line (dec (:end-line meta)) :ch (:end-column meta 0)
                                 :start-line (dec (:line meta 1))}]
                        (notifos/set-msg! (:result res) {:class "error"})
                        (object/raise obj :editor.exception.collapsible (:result res) (:stack res) loc))))

(behavior ::cljs-expandable-exception
          :triggers #{:editor.eval.cljs.exception}
          :reaction (fn [obj res passed?]
                      (when-not passed?
                        (notifos/done-working ""))
                      (let [meta (:meta res)
                            loc {:line (dec (:end-line meta)) :ch (:end-column meta)
                                 :start-line (dec (:line meta))}
                            msg (or (:stack res) (truncate (:ex res)))
                            stack (cond
                                    (:stack res)                           (:stack res)
                                    (and (:ex res) (.-stack (:ex res)))    (.-stack (:ex res))
                                    (and (:ex res) (:verbatim meta))       (:ex res)
                                    (and (:ex res) (not (:verbatim meta))) (pr-str (:ex res))
                                    (not (nil? msg))                       (or (:stack res) (:ex res)); untruncated stacktrace
                                    :else "Unknown error")]
                        (notifos/set-msg! msg {:class "error"})
                        (object/raise obj :editor.exception.collapsible msg stack loc))))
