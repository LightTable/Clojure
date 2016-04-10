(ns lt.plugins.clojure.collapsible-exception
  (:require [lt.util.dom :as dom]
            [lt.object :as object]
            [lt.objs.editor :as ed]
            [lt.objs.notifos :as notifos]
            [crate.binding :refer [bound]])
  (:require-macros [lt.macros :refer [defui behavior]]))

(def ^:private ^:const NOT_FOUND -1)

(def ^:const ^:private ansi-set&reset #"(.*?)\u001b\[([\d+;]+)m(.*?)\u001b\[m\s*")
(def ^:const ^:private ansi-set #"(.*?)\u001b\[([\d+;]+)m(.*)")

(def ^:const ^:private span-font
  {:bold "font-weight: bold", :italic "font-style: italic"})
(def ^:const ^:private span-color
  {"30" "black", "31" "OrangeRed", "32" "limegreen", "33" "yellow",
   "34" "blue", "35" "purple", "36" "cyan", "37" "white"})

(defn mods->css
  "takes a string with the ansi codes (ex: 1;31) and returns a string with
  the equivalent CSS style to use"
  [mods]
  (clojure.string/join ";"
    (for [modifier (clojure.string/split mods #";")]
      (condp = modifier
        "1" (:bold span-font)
        "3" (:italic span-font)
        (str "color:" (get span-color modifier))))))

(defn- inner-span
  "takes a text with a single ansi-code font change and returns a list with
  the preceding text and a styled span according to the ansi code"
  [text]
  (let [csi-inner    (zipmap [:match :start :mods :content] (re-find ansi-set text))
        span-style   (mods->css (:mods csi-inner))
        span-content (:content csi-inner)]
    (if (empty? csi-inner) (list text)
      (list (:start csi-inner) [:span {:style span-style} span-content]))))

(defn- spanner
  "takes a text-line with ansi code and transforms it into a sequence of spans
  for each ansi font change. The original format is preserved. Each span has
  its own style according to the ansi code used. See span-font and span-color
  for more details"
  [text]
  (when-not (empty? text)
    (let [csi-text     (zipmap [:match :space :mods :content] (re-find ansi-set&reset text))
          span-style   (mods->css (:mods csi-text))
          span-content (cons (:space csi-text) (inner-span (:content csi-text)))]
      (if (empty? csi-text) text
        (cons [:span {:style span-style} span-content]
              (spanner (subs text (count (:match csi-text)))))))))

(defn- ansi->hiccup
  "takes a full stacktrace text with ansi code and transforms it into sequence of divs for
  each line, and spans for each ansi font change. Returns a hiccup structure"
  [stack-text]
  (let [stack-lines (clojure.string/split-lines stack-text)
        div-lines   (map #(vector :div (spanner %)) stack-lines)]
    [:span.full div-lines]))

(defn truncate
  "truncate a string at newline or at 100 characters long"
  [text]
  (when-not (empty? text)
    (if (= NOT_FOUND (.indexOf text "\n"))
      (subs text 0 100); take 100 characters
      (first (clojure.string/split-lines text)))))

(defn strip-ansi
  "Removes ANSI codes from a string, returning just the raw text."
  [string]
  (clojure.string/replace string #"\u001b\[.*?m" ""))

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
     (ansi->hiccup stacktrace)])
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
                        (notifos/set-msg! (strip-ansi msg) {:class "error"})
                        (object/raise obj :editor.exception.collapsible msg stack loc))))
