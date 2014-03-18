(ns lt.plugins.clojure.instarepl
  (:require [lt.object :as object]
            [lt.objs.metrics :as metrics]
            [lt.objs.eval :as eval]
            [lt.objs.clients :as clients]
            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool]
            [lt.objs.console :as console]
            [lt.plugins.clojure :as clj]
            [lt.objs.notifos :as notifos]
            [lt.plugins.watches :as watches]
            [lt.objs.tabs :as tabs]
            [lt.util.dom :refer [prevent]]
            [lt.objs.sidebar.command :as cmd]
            [crate.binding :refer [bound subatom]]
            [crate.core :as crate]
            [cljs.reader :as reader])
  (:require-macros [lt.macros :refer [behavior defui]]))

;;TODO: version out of sync

(behavior ::on-eval-sonar
          :triggers #{:eval}
          :reaction (fn [obj auto? pos?]
                      (let [ed (:ed @obj)
                            v (watches/watched-range obj nil nil clj/clj-watch)
                            info (-> @obj :info)
                            info (if (editor/selection? ed)
                                   (assoc info :local true :code (editor/selection ed) :auto? false :meta {:start (-> (editor/->cursor ed "start") :line)})
                                   (assoc info :local true :code v :auto? auto? :pos (when pos? (editor/->cursor ed))))
                            info (assoc info :print-length (object/raise-reduce obj :clojure.print-length+ nil))]
                        (notifos/working "")
                        (clients/send (eval/get-client! {:origin obj
                                                         :info info
                                                         :create clj/try-connect
                                                         :command :editor.eval.clj.sonar})
                                      :editor.eval.clj.sonar
                                      info
                                      :only
                                      (:frame @obj)))))

(behavior ::on-eval-one
          :triggers #{:eval.one}
          :reaction (fn [this]
                      (object/raise this :eval false :pos)))

(behavior ::eval-on-change
          :triggers #{:change}
          :debounce 300
          :reaction (fn [this]
                      (let [parent @(:frame @this)]
                        (when (:live parent)
                          (object/raise this :eval true)))))

(behavior ::sonar-result
          :triggers #{:editor.eval.clj.sonar.result}
          :reaction (fn [this res]
                      (notifos/done-working)
                      (object/merge! this {:error nil})
                      (object/merge! (:main @this) {:info (assoc (-> @this :main deref :info) :ns (or (:ns res) "user"))})
                      (update-res this res)
                      ))

(behavior ::no-op
          :triggers #{:editor.eval.clj.sonar.noop}
          :reaction (fn [this]
                      (notifos/done-working)))

(behavior ::clj-exception
          :triggers #{:editor.eval.clj.exception}
          :reaction (fn [this ex]
                      (notifos/done-working)
                      (object/merge! this {:error (:msg ex)})
                      ))

(behavior ::destroy-on-close
          :triggers #{:close}
          :reaction (fn [this]
                      (object/raise (:main @this) :close)))


(behavior ::cleanup-on-destroy
          :triggers #{:destroy}
          :reaction (fn [this]
                      (doseq [[_ w] (-> @this :main deref :widgets)]
                        (object/raise w :clear!))))

(behavior ::dirty-parent
          :triggers #{:dirty :clean}
          :reaction (fn [this]
                      (when (:frame @this)
                        (object/merge! (:frame @this) {:dirty (:dirty @this)}))))

(behavior ::close-parent
          :triggers #{:destroy}
          :reaction (fn [this]
                      (object/destroy! (:frame @this))))

(behavior ::set-parent-title
          :triggers #{:save-as :path-changed}
          :reaction (fn [this]
                      (object/remove-tags this [:editor.clj])
                      (object/merge! (:frame @this) {:name (-> @this :info :name)})))

(behavior ::on-show-refresh-eds
          :triggers #{:show}
          :reaction (fn [this]
                      (object/raise (:main @this) :show)
                      (object/raise (:main @this) :refresh!)
                      (editor/focus (:main @this))
                      ))

(behavior ::reroute-watches
          :triggers #{:editor.eval.clj.watch}
          :reaction (fn [this r]
                      (object/raise (:main @this) :editor.eval.clj.watch r)))

(behavior ::on-focus-focus-ed
          :triggers #{:focus!}
          :reaction (fn [this]
                      (object/raise (:main @this) :focus!)))

(behavior ::live-toggle
          :triggers #{:live.toggle!}
          :reaction (fn [this]
                      (cmd/exec! :clear-inline-results)
                      (object/merge! this {:live (not (:live @this))})
                      (editor/focus (:main @this))))

(def default-content ";; Anything you type in here will be executed
;; immediately with the results shown on the
;; right.
")

(defn clean-ex [x]
  (.replace x (js/RegExp. "^.*user/eval[\\s\\S]*" "gmi") ""))

(defn ->type|val [r vs]
  (cond
   (= (:root r) :result) ["result" (-> r :cur last)]
   (= (:root r) :ex) ["exception" (-> r :cur last clean-ex)]
   :else ["use" (get vs (:root r))]))

(defn inline [this res opts]
  (object/create :lt.objs.eval/inline-result {:ed this
                                              :class (name (:type opts :inline))
                                              :opts opts
                                              :trunc-length 100
                                              :result res
                                              :loc opts
                                              :line (editor/line-handle this (:line opts))}))

(defn update-res [this results]
  (let [main (-> @this :main)
        vs (-> results :vals reader/read-string)
        repls (-> results :uses)
        out (:out results)]
    (editor/operation (:main @this)
                      (fn []
                        (doseq [w (-> @main ::widgets)]
                          (object/raise w :clear!))
                        (object/merge! main {::widgets (doall (for [r repls
                                                                    :let [[type val] (->type|val r vs)]]
                                                                (inline main val {:type type
                                                                                  :line (-> r :cur first dec)})))})))))

(behavior ::start-content
          :triggers #{:start-content+}
          :type :user
          :desc "Instarepl: Set start content"
          :params [{:label "content"}]
          :reaction (fn [this res content]
                      content))

(defui live-toggle [this]
  [:span {:class (bound this #(str "livetoggler " (when-not (:live %) "off")))} "live"]
  :click (fn [e]
           (prevent e)
           (object/raise this :live.toggle!)))

(object/object* ::instarepl
                :tags #{:instarepl}
                :name "Instarepl"
                :live true
                :init (fn [this]
                        (let [main (-> (pool/create {:mime "text/x-clojure" :content "" :ns "user"})
                                       (object/remove-tags [:editor.clj])
                                       (object/add-tags [:editor.clj.instarepl :editor.transient]))]
                          (object/merge! main {:frame this})
                          (editor/set-val main (or (object/raise-reduce main :start-content+) default-content))
                          (editor/clear-history main)
                          (object/merge! main {:dirty false
                                               :editor.generation (editor/->generation main)})
                          (object/merge! this {:main main
                                               :dirty false})
                          (editor/+class main :main)
                          (editor/move-cursor main {:line 10000 :ch 0})
                          [:div#instarepl
                           (live-toggle this)
                           (object/->content main)
                           [:p.error (bound this :error)]
                           ]
                          )))

(defn add []
  (let [instarepl (object/create ::instarepl)]
    (tabs/add! instarepl)
    (tabs/active! instarepl)
    instarepl))

(cmd/command {:command :instarepl-current
              :desc "Instarepl: Make current editor an instarepl"
              :exec (fn []
                      (let [cur (pool/last-active)
                            info (:info @cur)]
                        (when cur
                          (if-not (object/has-tag? cur :editor.clj)
                            (notifos/set-msg! "Instarepl only works for Clojure" {:class "error"})
                            (let [content (editor/->val cur)
                                  dirty (:dirty @cur)
                                  inst (object/create ::instarepl)
                                  ed (:main @inst)]
                              (object/merge! ed {:info info
                                                 :widgets {}
                                                 :dirty dirty})
                              (object/merge! inst {:name (-> info :name)
                                                   :dirty dirty})
                              (object/remove-tags ed [:editor.transient])
                              (object/add-tags ed [:editor.file-backed])
                              (editor/set-val ed content)
                              (object/raise cur :close.force)
                              (tabs/add! inst)
                              (tabs/active! inst)
                              )))
                        ))})

(cmd/command {:command :instarepl
              :desc "Instarepl: Open a clojure instarepl"
              :exec (fn []
                      (metrics/capture! :editor.clj.instarepl)
                      (add))})

(cmd/command {:command :instarepl.toggle-live
              :desc "Instarepl: Toggle live mode"
              :exec (fn []
                      (when-let [ed (pool/last-active)]
                        (when (:frame @ed)
                          (object/raise (:frame @ed) :live.toggle!))))})
