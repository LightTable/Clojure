(ns lt.plugins.clojure
  (:require [lt.object :as object]
            [lt.objs.clients :as clients]
            [lt.objs.files :as files]
            [lt.objs.context :as ctx]
            [lt.objs.sidebar.clients :as scl]
            [lt.objs.dialogs :as dialogs]
            [lt.objs.deploy :as deploy]
            [lt.objs.console :as console]
            [lt.objs.editor :as ed]
            [lt.objs.editor.pool :as pool]
            [lt.objs.popup :as popup]
            [lt.objs.platform :as platform]
            [lt.objs.tabs :as tabs]
            [lt.plugins.auto-complete :as auto-complete]
            [lt.objs.proc :as proc]
            [lt.objs.eval :as eval]
            [lt.objs.notifos :as notifos]
            [lt.plugins.watches :as watches]
            [lt.util.dom :as dom]
            [lt.util.js :as util]
            [lt.util.load :as load]
            [lt.util.cljs :refer [->dottedkw str-contains?]]
            [clojure.string :as string]
            [cljs.reader :as reader]
            [lt.objs.command :as cmd]
            [lt.objs.plugins :as plugins])
  (:require-macros [lt.macros :refer [behavior defui]]))

(def shell (load/node-module "shelljs"))
(def cur-path (.pwd shell))
(def local-project-clj (files/join plugins/*plugin-dir* "runner/resources/project.clj"))
(def jar-path (files/join plugins/*plugin-dir* "runner/target/lein-light-standalone.jar"))

;;****************************************************
;; highlighting
;;****************************************************

(behavior ::highlight-comment-forms
          :triggers #{:object.instant}
          :desc "Clojure: Highlight comment forms as comments"
          :type :user
          :reaction (fn [this]
                      (when-let [m (ed/inner-mode this)]
                        (set! (.-commentForms m) true))))

;;****************************************************
;; Lang object
;;****************************************************

(def local-name "LightTable-REPL")

(defn unescape-unicode [s]
  (when (string? s)
    (string/replace s
                    #"\\x(..)"
                    (fn [res r]
                      (js/String.fromCharCode (js/parseInt r 16))))))

(defn try-connect [{:keys [info]}]
  (let [path (:path info)
        {:keys [project-path]} (when path (find-project {:path path}))]
    (if project-path
      (do
        (check-all {:path path
                    :client (clients/client! :nrepl.client)}))
      (or (clients/by-name local-name)
          (run-local-server (clients/client! :nrepl.client))))))

(behavior ::on-eval.clj
          :desc "Clojure: Eval editor content"
          :triggers #{:eval}
          :reaction (fn [editor]
                      (object/raise clj-lang :eval! {:origin editor
                                                     :info (assoc (@editor :info)
                                                             :print-length (object/raise-reduce editor :clojure.print-length+ nil)
                                                             :code (watches/watched-range editor nil nil nil))})))
(behavior ::on-eval.cljs
          :desc "Clojure: Eval editor content"
          :triggers #{:eval}
          :reaction (fn [editor]
                      (object/raise clj-lang :eval! {:origin editor
                                                     :info (assoc (@editor :info)
                                                             :print-length (object/raise-reduce editor :clojure.print-length+ nil)
                                                             ;; COMPILED temporarily enabled to turn off goog.provide ns errors
                                                             :code (str
                                                                    "(set! js/COMPILED-temp js/COMPILED) (set! js/COMPILED true) "
                                                                    (watches/watched-range editor nil nil nil)
                                                                    "(set! js/COMPILED js/COMPILED-temp)"))})))

(behavior ::on-eval.one
          :desc "Clojure: Eval a single form in editor"
          :triggers #{:eval.one}
          :reaction (fn [editor]
                      (let [code (watches/watched-range editor nil nil nil)
                            pos (ed/->cursor editor)
                            info (:info @editor)
                            info (if (ed/selection? editor)
                                   (assoc info
                                     :code (ed/selection editor)
                                     :meta {:start (-> (ed/->cursor editor "start") :line)
                                            :end (-> (ed/->cursor editor "end") :line)})
                                   (assoc info :pos pos :code code))
                            info (assoc info :print-length (object/raise-reduce editor :clojure.print-length+ nil))]
                        (object/raise clj-lang :eval! {:origin editor
                                                       :info info}))))


(defn fill-placeholders
  "Replace editor-selection-flags, that is `__SELECTION*__`, inside `exp` with the currently
  selected code in `editor`."
  [editor exp]
  (-> exp
      (string/replace "__SELECTION*__" (pr-str (ed/selection editor)))
      (string/replace "__SELECTION__" (ed/selection editor))))

(behavior ::on-eval.custom
          :desc "Clojure: Eval a form that has been wrapped by custom code"
          :doc "Example:

          ```
          (eval (time form)) ;; instead of (eval form)
          ```"
          :triggers #{:eval.custom}
          :reaction (fn [editor exp opts]
                      (let [code (fill-placeholders editor exp)
                            pos (ed/->cursor editor)
                            info (:info @editor)
                            info  (assoc info
                                    :code code
                                    :ns (or (:ns opts) (:ns info))
                                    :meta (merge {:start (-> (ed/->cursor editor "start") :line)
                                                  :end (-> (ed/->cursor editor "end") :line)
                                                  :result-type :inline
                                                  :trigger :return}
                                                 (update-in opts [:handler] object/->id)))
                            info (assoc info :print-length (object/raise-reduce editor :clojure.print-length+ nil))]
                        (object/raise clj-lang :eval! {:origin editor
                                                       :info info}))))

(behavior ::on-code
          :triggers #{:editor.eval.cljs.code}
          :reaction (fn [this result]
                      (object/raise this :exec.cljs! result)))

(behavior ::exec.cljs!
          :triggers #{:exec.cljs!}
          :reaction (fn [this res]
                      (let [client (-> @this :client :exec)
                            path (-> @this :info :path)
                            res (update-in res [:results] #(for [r %]
                                                             (assoc r :code (-> (:code r)
                                                                                (eval/pad (-> r :meta :line dec))
                                                                                (eval/append-source-file path))
                                                               :meta (merge (:meta res) (:meta r)))))]
                        (clients/send (eval/get-client! {:command :editor.eval.cljs.exec
                                                         :info {:type "cljs"}
                                                         :key :exec
                                                         :origin this})
                                      :editor.eval.cljs.exec res :only this))))

(def mime->type {"text/x-clojure" "clj"
                 "text/x-clojurescript" "cljs"})

(def default-cljs-client
  "Default cljs client to invoke when a cljs file is first evaled. Takes any valid client or
  :auto which automatically sets 'Light Table UI' or 'ClojureScript Browser' based on whether
  project is LightTable related or not."
  nil)

(behavior ::set-default-cljs-client
          :triggers #{:object.instant}
          :desc "Clojure: Set default ClojureScript client to use when first evaled. Disable with nil"
          :type :user
          :params [{:label "client-name"
                    :type :list
                    :items ["ClojureScript Browser" "Light Table UI" "Browser" "Browser (External)"]}]
          :reaction (fn [this client-name]
                      (set! default-cljs-client client-name)))

(defn lighttable-ui-project?
  "Determine if path is part of a project that evals to LightTable's process
  (i.e., LightTable plugin or LightTable itself)."
  [path]
  (or (files/walk-up-find path "plugin.edn")
      (files/walk-up-find path "plugin.json")
      (when-let [project-file (files/walk-up-find path "project.clj")]
        (= 'lighttable (second (reader/read-string (:content (files/open-sync project-file))))))))

(behavior ::eval!
          :desc "Clojure: Send event information for evaluation."
          :doc "This event information goes to the appropriate nREPL or LightTable-UI client."
          :triggers #{:eval!}
          :reaction (fn [this event]
                      (let [{:keys [info origin]} event
                            command (->dottedkw :editor.eval (-> info :mime mime->type))
                            client (-> @origin :client :default)]
                        (notifos/working)
                        (clients/send (eval/get-client! {:command command
                                                         :info info
                                                         :origin origin
                                                         :create (fn [arg]
                                                                   (when (contains? (set (:tags info)) :editor.cljs)
                                                                     (let [client (if (= :auto default-cljs-client)
                                                                                    (if (lighttable-ui-project? (:path info))
                                                                                      "Light Table UI" "ClojureScript Browser")
                                                                                    default-cljs-client)]
                                                                       (when-let [connect-fn (-> @scl/clients :connectors (get client) :connect)]
                                                                         (connect-fn))))
                                                                   (try-connect arg))})
                                      command info :only origin))))

(behavior ::build!
          :triggers #{:build!}
          :reaction (fn [this event]
                      (let [{:keys [info origin]} event
                            command (->dottedkw (-> info :mime mime->type) "compile")]
                        (notifos/working "Starting build")
                        (clients/send (eval/get-client! {:command command
                                                         :info info
                                                         :origin origin
                                                         :create try-connect})
                                      command info :only origin))))

(behavior ::build-cljs-plugin
          :triggers #{:build}
          :desc "Plugin: build ClojureScript plugin"
          :reaction (fn [this opts]
                      (let [to-compile (files/filter-walk #(= (files/ext %) "cljs") (files/join (:lt.objs.plugins/plugin-path @this) "src"))]
                        (object/raise clj-lang :build! {:info {:files to-compile
                                                               :mime (-> @this :info :mime)
                                                               :dir (:lt.objs.plugins/plugin-path @this)
                                                               :path (files/join (:lt.objs.plugins/plugin-path @this) "plugin.edn")
                                                               :ignore ['goog
                                                                        'goog.array
                                                                        'lt.object
                                                                        'crate.core
                                                                        'crate.util
                                                                        'lt.util.load
                                                                        'lt.util.cljs
                                                                        'lt.util.dom
                                                                        'lt.util.js
                                                                        'fetch.core
                                                                        'fetch.util
                                                                        'cljs.core
                                                                        'cljs.reader
                                                                        'clojure.string
                                                                        'clojure.set
                                                                        'goog.string]
                                                               :merge? true}
                                                        :origin this}))))

(behavior ::plugin-compile-results
          :triggers #{:cljs.compile.results}
          :desc "Plugin: output compile results"
          :reaction (fn [this res]
                      (let [plugin-name (-> (:lt.objs.plugins/plugin-path @this) plugins/plugin-info :name string/lower_case)
                            final-path (files/join (:lt.objs.plugins/plugin-path @this) (str plugin-name "_compiled.js"))
                            plugin-map-name (str plugin-name "_compiled.js.map")
                            sm-path (files/join (:lt.objs.plugins/plugin-path @this) plugin-map-name)]
                        (notifos/done-working (str "Compiled plugin to " final-path))
                        (files/save final-path (str (:js res) "\n//# sourceMappingURL=" plugin-map-name))
                        (files/save sm-path (:source-map res)))))

(behavior ::on-result-set-ns
          :triggers #{:editor.eval.cljs.code
                      :editor.eval.clj.result}
          :reaction (fn [obj res]
                      (when (and (:ns res)
                                 (not= (-> @obj :info :ns) (:ns res)))
                        (object/update! obj [:info] assoc :ns (:ns res)))))

(behavior ::no-op
          :triggers #{:editor.eval.cljs.no-op
                      :editor.eval.clj.no-op}
          :reaction (fn [this]
                      (notifos/done-working)))

(behavior ::cljs-result
          :desc "Clojure: Receive a cljs result and dispatch it"
          :triggers #{:editor.eval.cljs.result}
          :reaction (fn [obj res]
                      (notifos/done-working)
                      (let [type (or (-> res :meta :result-type) :inline)
                            ev (->dottedkw :editor.eval.cljs.result type)]
                        (object/raise obj ev res))))

(behavior ::cljs-result.replace
          :desc "Clojure: Replace current selection with the result of an evaluation"
          :triggers #{:editor.eval.cljs.result.replace}
          :reaction (fn [obj res]
                      (if-let [err (or (:stack res) (:ex res))]
                        (notifos/set-msg! err {:class "error"})
                        (ed/replace-selection obj  (unescape-unicode (or (:result res) ""))))))

(behavior ::cljs-result.statusbar
          :desc "Clojure: Show the result of an evaluation on the statusbar"
          :triggers #{:editor.eval.cljs.result.statusbar}
          :reaction (fn [obj res]
                      (if-let [err (or (:stack res) (:ex res))]
                        (notifos/set-msg! err {:class "error"})
                        (notifos/set-msg! (unescape-unicode (or (:result res) "")) {:class "result"}))))

(behavior ::cljs-result.inline
          :desc "Clojure: Show the resulting evaluation on inline widget"
          :doc "The resulting evaluation is dispatched either as an exception or an inline-result."
          :triggers #{:editor.eval.cljs.result.inline}
          :reaction (fn [obj res]
                      (let [meta (:meta res)
                            loc {:line (dec (:end-line meta)) :ch (:end-column meta)
                                 :start-line (dec (:line meta))}]
                        (if-let [err (or (:stack res) (:ex res))]
                          (object/raise obj :editor.eval.cljs.exception res :passed)
                          (object/raise obj :editor.result (unescape-unicode (or (:result res) "")) loc)))))

(behavior ::cljs-result.inline-at-cursor
          :desc "Clojure: Show the resulting evaluation inline at cursor location"
          :doc "This is similar to `::cljs-result.inline`, but puts the result as the cursor location."
          :triggers #{:editor.eval.cljs.result.inline-at-cursor}
          :reaction (fn [obj res]
                      (let [meta (:meta res)
                            loc {:line (:start meta)
                                 :start-line (:start meta)}]
                        (if-let [err (or (:stack res) (:ex res))]
                          (object/raise obj :editor.eval.cljs.exception res :passed)
                          (object/raise obj :editor.result (unescape-unicode (or (:result res) "")) loc)))))

(behavior ::cljs-result.return
          :triggers #{:editor.eval.cljs.result.return}
          :reaction (fn [obj res]
                      (let [meta (:meta res)
                            handler (-> meta :handler object/by-id)
                            ev (:trigger meta)]
                        (if-let [err (or (:stack res) (:ex res))]
                          (object/raise obj :editor.eval.cljs.exception res :passed)
                          (object/raise handler ev {:result (unescape-unicode (or (:result res) ""))
                                                    :meta meta})))))

(behavior ::clj-result
          :desc "Clojure: Receive an eval! result and dispatch it"
          :doc "The dispatch is according to the appropiate result type. Defaults to `:inline`."
          :triggers #{:editor.eval.clj.result}
          :reaction (fn [obj res]
                      (notifos/done-working)
                      (let [type (or (-> res :meta :result-type) :inline)
                            ev (->dottedkw :editor.eval.clj.result type)]
                        (object/raise obj ev res))))

(behavior ::clj-result.replace
          :desc "Clojure: Replace current selection with the result"
          :triggers #{:editor.eval.clj.result.replace}
          :reaction (fn [obj res]
                      (doseq [result (-> res :results)
                              :let [meta (:meta result)
                                    loc {:line (dec (:end-line meta)) :ch (:end-column meta)
                                         :start-line (dec (:line meta))}]]
                        (if (:stack result)
                          (notifos/set-msg! (:result res) {:class "error"})
                          (ed/replace-selection obj (:result result))))))

(behavior ::clj-result.statusbar
          :desc "Clojure: Show evaluation result on the statusbar"
          :triggers #{:editor.eval.clj.result.statusbar}
          :reaction (fn [obj res]
                      (doseq [result (-> res :results)
                              :let [meta (:meta result)
                                    loc {:line (dec (:end-line meta)) :ch (:end-column meta)
                                         :start-line (dec (:line meta))}]]
                        (if (:stack result)
                          (notifos/set-msg! (:result res) {:class "error"})
                          (notifos/set-msg! (:result result) {:class "result"})))))

(behavior ::clj-result.inline
          :desc "Clojure: Display eval result inline"
          :doc "Dispatches as an exception or an inline-result."
          :triggers #{:editor.eval.clj.result.inline}
          :reaction (fn [obj res]
                      (doseq [result (-> res :results)
                              :let [meta (:meta result)
                                    loc {:line (dec (:end-line meta)) :ch (:end-column meta)
                                         :start-line (dec (:line meta))}]]
                        (if (:stack result)
                          (object/raise obj :editor.eval.clj.exception result :passed)
                          (object/raise obj :editor.result (:result result) loc)))))

(behavior ::clj-result.inline-at-cursor
          :desc "Clojure: Display the eval result inline at cursor location"
          :doc "This is similar to `::clj-result.inline`, but puts the result at the cursor location."
          :triggers #{:editor.eval.clj.result.inline-at-cursor}
          :reaction (fn [obj res]
                      (doseq [result (-> res :results)
                              :let [meta (:meta result)
                                    loc {:line (-> res :meta :start)
                                         :start-line (-> res :meta :start)}]]
                        (if (:stack result)
                          (object/raise obj :editor.eval.clj.exception result :passed)
                          (object/raise obj :editor.result (:result result) loc)))))

(behavior ::clj-result.return
          :triggers #{:editor.eval.clj.result.return}
          :reaction (fn [obj res]
                      (doseq [result (-> res :results)
                              :let [meta (:meta res)
                                    handler (-> meta :handler object/by-id)
                                    ev (:trigger meta)]]
                        (if (:stack result)
                          (object/raise obj :editor.eval.clj.exception result :passed)
                          (object/raise handler ev {:result (:result result)
                                                    :meta meta})))))

(behavior ::clj-exception
          :desc "Clojure: Display stacktrace information and summary in statusbar"
          :triggers #{:editor.eval.clj.exception}
          :reaction (fn [obj res passed?]
                      (when-not passed?
                        (notifos/done-working ""))
                      (let [meta (:meta res)
                            loc {:line (dec (:end-line meta)) :ch (:end-column meta 0)
                                 :start-line (dec (:line meta 1))}]
                        (notifos/set-msg! (:result res) {:class "error"})
                        (object/raise obj :editor.exception (:stack res) loc))))

(behavior ::cljs-exception
          :desc "Clojure: Display stacktrace information and summary in statusbar"
          ;; Line below is too long to include, but will be useful after https://github.com/LightTable/LightTable/issues/2197
          :doc "Take the result of evaling a cljs form, which resulted in an exception,
          and displays a message in the status bar and an exception widget with the stacktrace."
          :triggers #{:editor.eval.cljs.exception}
          :reaction (fn [obj res passed?]
                      (when-not passed?
                        (notifos/done-working ""))
                      (let [meta (:meta res)
                            loc {:line (dec (:end-line meta)) :ch (:end-column meta)
                                 :start-line (dec (:line meta))}
                            msg (or (:stack res) (:ex res))
                            stack (or (:stack res)
                                      (if (and (:ex res)
                                               (.-stack (:ex res)))
                                        (.-stack (:ex res))
                                        (if (:ex res)
                                          (if (:verbatim meta)
                                            (:ex res)
                                            (pr-str (:ex res)))))
                                      msg
                                      "Unknown error")]
                        (notifos/set-msg! msg {:class "error"})
                        (object/raise obj :editor.exception stack loc))))

(behavior ::eval-print
          :triggers #{:editor.eval.clj.print}
          :reaction (fn [this str]
                      (when (not= "\n" (:out str))
                        (console/loc-log {:file (files/basename (or (-> @this :name) (-> @this :info :path) "unknown"))
                                          :line (when (object/has-tag? this :nrepl.client)
                                                  "stdout")
                                          :id (:id str)
                                          :content (:out str)}))))

(behavior ::eval-print-err
          :triggers #{:editor.eval.clj.print.err}
          :reaction (fn [this str]
                      (when (not= "\n" (:out str))
                        (console/error (:out str)))))

(behavior ::handle-cancellation
          :triggers #{:editor.eval.clj.cancel}
          :reaction (fn [this]
                      (notifos/done-working)
                      (notifos/set-msg! "Canceled clj eval." {:class "error"})))

(behavior ::print-length
          :triggers #{:clojure.print-length+}
          :desc "Clojure: Set the print length for eval (doesn't affect CLJS)"
          :params [{:label "length"
                    :type :number}]
          :type :user
          :exclusive true
          :reaction (fn [this res len]
                      len))

(behavior ::java-exe
          :triggers #{:object.instant}
          :desc "Clojure: set the path to the Java executable for clients"
          :type :user
          :params [{:label "path"}]
          :exclusive true
          :reaction (fn [this path]
                      (object/merge! clj-lang {:java-exe path})))

;;****************************************************
;; Connectors
;;****************************************************

(behavior ::connect-local
          :triggers #{:connect}
          :reaction (fn [this path]
                      (try-connect {:info {:path path}})))


(scl/add-connector {:name "Clojure"
                    :desc "Select a project.clj to connect to."
                    :connect (fn []
                               (dialogs/file clj-lang :connect))})

(defui server-input []
  [:input {:type "text" :placeholder "host:port" :value "localhost:"}]
  :focus (fn []
           (ctx/in! :popup.input))
  :blur (fn []
          (ctx/out! :popup.input)))

(defn connect-to-remote [server]
  (let [[host port] (string/split server ":")]
    (when (and host port)
      (let [client (clients/client! :nrepl.client.remote)]
        (object/merge! client {:port port
                               :host host
                               :name server})
        (object/raise client :connect!)))))

(defn remote-connect []
  (let [input (server-input)
        p (popup/popup! {:header "Connect to a remote nREPL server."
                         :body [:div
                                [:p "In order to connect to an nrepl server, make sure the server is started (e.g. lein repl :headless)
                                 and that you have included the lighttable.nrepl.handler/lighttable-ops middleware."]
                                [:label "Server: "]
                                input
                                ]
                         :buttons [{:label "cancel"}
                                   {:label "connect"
                                    :action (fn []
                                              (connect-to-remote (dom/val input)))}]})]
    (dom/focus input)
    (.setSelectionRange input 1000 1000)
    ))

(scl/add-connector {:name "Clojure (remote nREPL)"
                    :desc "Enter in the host:port address of an nREPL server to connect to"
                    :connect (fn []
                               (remote-connect)
                               )})


;;****************************************************
;; watches
;;****************************************************

;; For more information on watches check
;;
;; Original anouncement: https://groups.google.com/forum/#!msg/light-table-discussion/lyFzPGI2XMs/ec8T1OUPvMsJ
;;
;; Blog posts: http://scattered-thoughts.net/blog/2014/01/27/were-not-even-trying/?utm_source=dlvr.it&utm_medium=twitter
;;             https://medium.com/@zindlerb/guide-to-light-table-watches-fad560f698d3#.oqwq991sx
;;
;; Rolex watches plugin: https://groups.google.com/forum/#!topic/light-table-discussion/NQWGC0vVHMY

(behavior ::cljs-watch-src
          :desc "Clojure: Wraps the watched source code"
          :doc  "Wraps watched code to catch its result and send it back to LightTable,
          while continuing normal evaluation of an expression."
          :triggers #{:watch.src+}
          :reaction (fn [editor cur meta src]
                      (let [meta (assoc meta :ev :editor.eval.cljs.watch)]
                        (str "(js/lttools.watch " src " (clj->js " (pr-str meta) "))"))))

(behavior ::clj-watch-src
          :desc "Clojure: Wraps the watched source code"
          :doc "Wraps watched code to catch its result and send it back to LightTable,
          while continuing normal evaluation of an expression."
          :triggers #{:watch.src+}
          :reaction (fn [editor cur meta src]
                      (str "(lighttable.nrepl.eval/watch " src " " (pr-str meta) ")")))

(defn fill-watch-placeholders
  "Replace editor-selection-flags (placeholders) for custom watches inside `exp`
  with the src-code to be watched."
  [exp src meta watch]
  (-> exp
      (string/replace "\n" " ")
      (string/replace "__SELECTION*__" (pr-str src))
      (string/replace "__SELECTION__" src)
      (string/replace "__ID__" (pr-str (:id meta)))
      (string/replace #"__\|(.*)\|__" watch)))

(behavior ::cljs-watch-custom-src
          :desc "Clojure: Prepare expression for watching"
          :doc "The expression is prepared by filling its placeholders and wrapping its watcher-code
          with custom call to `:editor.eval.cljs.watch`."
          :triggers #{:watch.custom.src+}
          :reaction (fn [editor cur meta opts src]
                      (let [watch (str "(js/lttools.raise " (:obj meta)
                                           " :editor.eval.cljs.watch {:meta " (pr-str (merge (dissoc opts :exp) meta))
                                                                      " :result $1})")]
                        (fill-watch-placeholders (:exp opts) src meta watch))))

(behavior ::clj-watch-custom-src
          :desc "Clojure: Prepare expression for watching"
          :doc "The exp is prepared by filling its placeholders and wrapping its watcher-code
          with custom call to `:editor.eval.clj.watch`"
          :triggers #{:watch.custom.src+}
          :reaction (fn [editor cur meta opts src]
                      (let [wrapped (if (:verbatim opts)
                                      "$1"
                                      "(pr-str $1)")
                            watch (str "(lighttable.nrepl.core/safe-respond-to " (:obj meta) " :editor.eval.clj.watch {:meta " (pr-str (merge (dissoc opts :exp) meta)) " :result " wrapped "})")]
                        (fill-watch-placeholders (:exp opts) src meta watch))))

(behavior ::cljs-watch-result
          :triggers #{:editor.eval.cljs.watch}
          :reaction (fn [editor res]
                      (when-let [watch (get (:watches @editor) (-> res :meta :id))]
                        (let [str-result (if-not (-> res :meta :verbatim)
                                           (pr-str (:result res))
                                           (:result res))
                              str-result (if (= str-result "#<[object Object]>")
                                           (console/util-inspect (:result res) false 1)
                                           str-result)
                              str-result (util/escape str-result)]
                          (object/raise (:inline-result watch) :update! str-result)))))

(behavior ::clj-watch-result
          :triggers #{:editor.eval.clj.watch}
          :reaction (fn [editor res]
                      (when-let [watch (get (:watches @editor) (-> res :meta :id))]
                        (let [str-result (:result res)
                              str-result (util/escape str-result)]
                          (object/raise (:inline-result watch) :update! str-result)))))


;;****************************************************
;; doc
;;****************************************************

(behavior ::clj-doc
          :desc "Clojure: Request docstring for symbol at cursor from nREPL"
          :triggers #{:editor.doc}
          :reaction (fn [editor]
                      (let [token (find-symbol-at-cursor editor)
                            command :editor.clj.doc
                            info (assoc (@editor :info)
                                   :result-type :doc
                                   :loc (:loc token)
                                   :sym (:string token)
                                   :print-length (object/raise-reduce editor :clojure.print-length+ nil)
                                   :code (watches/watched-range editor nil nil nil))]
                        (when token
                          (clients/send (eval/get-client! {:command command
                                                           :info info
                                                           :origin editor
                                                           :create try-connect})
                                        command info :only editor)))))

(behavior ::print-clj-doc
          :triggers #{:editor.clj.doc}
          :reaction (fn [editor result]
                      (when (= :doc (:result-type result))
                        (if-not result
                          (notifos/set-msg! "No docs found." {:class "error"})
                          (object/raise editor :editor.doc.show! result)))))

(defn symbol-token? [s]
  (re-seq #"[\w\$_\-\.\*\+\/\?\><!]" s))

(defn find-symbol-at-cursor [editor]
  (let [loc (ed/->cursor editor)
        token-left (ed/->token editor loc)
        token-right (ed/->token editor (update-in loc [:ch] inc))]
    (or (when (symbol-token? (:string token-right))
          (assoc token-right :loc loc))
        (when (symbol-token? (:string token-left))
          (assoc token-left :loc loc)))))

(behavior ::cljs-doc
          :desc "Clojure: Request docstring for symbol at cursor from nREPL"
          :triggers #{:editor.doc}
          :reaction (fn [editor]
                      (let [token (find-symbol-at-cursor editor)
                            command :editor.cljs.doc
                            info (assoc (@editor :info)
                                   :result-type :doc
                                   :loc (:loc token)
                                   :sym (:string token)
                                   :print-length (object/raise-reduce editor :clojure.print-length+ nil)
                                   :code (watches/watched-range editor nil nil nil))]
                        (when token
                          (clients/send (eval/get-client! {:command command
                                                           :info info
                                                           :origin editor
                                                           :create try-connect})
                                        command info :only editor)))))

(behavior ::print-cljs-doc
          :triggers #{:editor.cljs.doc}
          :reaction (fn [editor result]
                      (when (= :doc (:result-type result))
                        (if-not result
                          (notifos/set-msg! "No docs found." {:class "error"})
                          (object/raise editor :editor.doc.show! result)))))

(behavior ::clj-doc-search
          :desc "Clojure: Add trigger for Clojure in language documentation search"
          :doc "Links the 'Search language docs' input-text on the sidebar with a trigger to
          `:docs.clj.search` to retrieve all the documentation on a user-input."
          :triggers #{:types+}
          :reaction (fn [this cur]
                      (conj cur {:label "clj" :trigger :docs.clj.search :file-types #{"Clojure"}})))

(behavior ::cljs-doc-search
          :desc "Clojure: Add trigger for ClojureScript in language documentation search"
          :doc "Links the 'Search language docs' input-text on the sidebar with a trigger to
          `:docs.cljs.search` to retrieve all the documentation on a user-input."
          :triggers #{:types+}
          :reaction (fn [this cur]
                      (conj cur {:label "cljs" :trigger :docs.cljs.search :file-types #{"ClojureScript"}})))

;;****************************************************
;; autocomplete
;;****************************************************

(behavior ::trigger-update-hints
          :triggers #{:editor.clj.hints.update!}
          :debounce 100
          :reaction (fn [editor res]
                      (when-let [default-client (-> @editor :client :default)] ;; dont eval unless we're already connected
                        (when @default-client
                          (let [info (:info @editor)
                                command (->dottedkw :editor (-> info :mime mime->type) :hints)]
                            (clients/send (eval/get-client! {:command command
                                                             :info info
                                                             :origin editor
                                                             :create try-connect})
                                          command info :only editor))))))

(behavior ::finish-update-hints
          :triggers #{:editor.clj.hints.result
                      :editor.cljs.hints.result}
          :reaction (fn [editor res]
                      (object/merge! editor {::hints res})
                      (object/raise auto-complete/hinter :refresh!)))

(behavior ::use-local-hints
          :triggers #{:hints+}
          :reaction (fn [editor hints token]
                      (when (not= token (::token @editor))
                        (object/merge! editor {::token token})
                        (object/raise editor :editor.clj.hints.update!))
                      (if-let [clj-hints (::hints @editor)]
                        (concat clj-hints hints)
                        hints)))

;;****************************************************
;; Jump to definition
;;****************************************************

(behavior ::jump-to-definition-at-cursor
          :triggers #{:editor.jump-to-definition-at-cursor!}
          :reaction (fn [editor]
                      (let [token (find-symbol-at-cursor editor)]
                        (when token
                          (object/raise editor :editor.jump-to-definition! (:string token))))))

(behavior ::start-jump-to-definition
          :triggers #{:editor.jump-to-definition!}
          :reaction (fn [editor string]
                      (let [info (:info @editor)
                            command (->dottedkw :editor (-> info :mime mime->type) :doc)
                            info (assoc info
                                   :result-type :jump
                                   :sym string)]
                        (clients/send (eval/get-client! {:command command
                                                         :info info
                                                         :origin editor
                                                         :create try-connect})
                                      command info :only editor))))

(behavior ::finish-jump-to-definition
          :triggers #{:editor.clj.doc
                      :editor.cljs.doc}
          :reaction (fn [editor {:keys [file line] :as res}]
                      (when (= :jump (:result-type res))
                        (if (and res file line)
                          (object/raise lt.objs.jump-stack/jump-stack :jump-stack.push! editor file {:line (dec line) :ch 0})
                          (notifos/set-msg! "Definition not found" {:class "error"})))))

;;****************************************************
;; Proc
;;****************************************************

(behavior ::on-out
          :triggers #{:proc.out}
          :reaction (fn [this data]
                      (let [out (.toString data)]
                        (.write console/core-log (str (:name @this) "[stdout]: " data))
                        (object/update! this [:buffer] str out)
                        (if (> (.indexOf out "nREPL server started") -1)
                          (do
                            (notifos/done-working)
                            (object/merge! this {:connected true})
                            (let [client (clients/by-id (:cid @this))]
                              (object/merge! client {:port (-> (re-seq #"port ([\d]+)" out) first second)})
                              (object/raise client :connect!))
                            ;(object/destroy! this)
                            )
                          (when-not (:connected @this)
                            (notifos/set-msg! "Retrieving deps.. " {}))))
                      ))

(behavior ::on-error
          :triggers #{:proc.error}
          :reaction (fn [this data]
                      (let [out (.toString data)]
                        (.write console/core-log (str (:name @this) "[stderr]: " data))
                        (when-not (> (.indexOf (:buffer @this) "nREPL server started") -1)
                          (object/update! this [:buffer] str data)
                          ))
                      ))


(behavior ::on-exit
          :triggers #{:proc.exit}
          :reaction (fn [this data]
                      ;(object/update! this [:buffer] str data)
                      (when-not (:connected @this)
                        (notifos/done-working)
                        (notifos/done-working)
                        (popup/popup! {:header "We couldn't connect."
                                       :body [:span "Looks like there was an issue trying to connect
                                              to the project. Here's what we got:" [:pre (:buffer @this)]]
                                       :buttons [{:label "close"}]})
                        (notifos/set-msg! "Failed to connect" {:class "error"})
                        (clients/rem! (clients/by-id (:cid @this))))
                      (proc/kill-all (:procs @this))
                      (object/destroy! this)
                      ))

(object/object* ::connecting-notifier
                :triggers []
                :behaviors [::on-exit ::on-error ::on-out]
                :init (fn [this notifier cid]
                        (object/merge! this {:notifier notifier :buffer "" :cid cid})
                        nil))

(defn wrap-quotes [s]
  (str "\"" s "\""))

(defn windows-escape [s]
  (if (and (str-contains? s " ") (platform/win?))
    (wrap-quotes s)
    s))

(defn jar-command [path name client]
  ;(println (.which shell "java"))
  (str (or (:java-exe @clj-lang) "java") " -jar " (windows-escape jar-path) " " name))

(defn run-jar [{:keys [path project-path name client]}]
  (let [obj (object/create ::connecting-notifier n (clients/->id client))
        args ["-Xmx1g" "-jar" (windows-escape jar-path)]]
    (notifos/working "Connecting..")
    (.write console/core-log (str "STARTING CLIENT: " (jar-command project-path name client)))
    (proc/exec {:command (or (:java-exe @clj-lang) "java")
                :args (if name
                        (conj args name)
                        args)
                :cwd project-path
                :obj obj})

    (object/merge! client {:dir project-path})
    (object/raise client :try-connect!)))

(defn run-local-server [client]
  (check-all {:path local-project-clj
              :client client
              :name local-name}))

(defn check-java [obj]
  ;(println (.sync which "java"))
  (assoc obj :java (or (:java-exe @clj-lang)
                       (aget js/process.env "JAVA_HOME")
                       (.which shell "java"))))

(defn check-ltjar [obj]
  (assoc obj :ltjar (files/exists? jar-path)))

(defn find-project [obj]
  (if-let [path (files/walk-up-find (:path obj) "project.clj")]
    (assoc obj :project-path (files/parent path))
    (assoc obj :project-path nil)))

(defn notify [obj]
  (let [{:keys [java project-path path ltjar]} obj]
    (cond
     (or (not java) (empty? java)) (popup/popup! {:header "We couldn't find java."
                                                  :body "Clojure evaluation requires the JDK to be installed."
                                                  :buttons [{:label "Download the JDK"
                                                             :action (fn []
                                                                       (platform/open "http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html"))}
                                                            {:label "ok"}]})
     (not ltjar) (do (deploy/deploy) (run-jar obj))
     (not project-path) (console/error (str "Couldn't find a project.clj in any parent of " path))
     :else (run-jar obj))
    obj))

(defn check-all [obj]
  (-> obj
      (check-java)
      (check-ltjar)
      (find-project)
      (notify))
  (:client obj))

(object/object* ::langs.clj
                :tags #{:clojure.lang})

(def clj-lang (object/create ::langs.clj))

(def cljs-browser-paths
  "Relative paths to search for when connecting to a Clojurescript Browser."
  [])

(behavior ::set-cljs-browser-paths
          :triggers #{:object.instant}
          :desc "Clojure: Set relative paths or urls to check for and use in ClojureScript Browser"
          :type :user
          :params [{:label "paths"}]
          :reaction (fn [this paths]
                      (set! cljs-browser-paths paths)))

(defn find-cljs-browser-url
  "Searches cljs-browser-paths for first url or relative path to exist and returns it."
  [ed]
  (let [project-dir (files/parent (files/walk-up-find (get-in @ed [:info :path]) "project.clj"))]
    (some #(if (re-find #"^https?://" %)
             %
             (when (files/exists? (files/join project-dir %))
               (str "file://" (files/join project-dir %))))
          cljs-browser-paths)))

(scl/add-connector {:name "ClojureScript Browser"
                    :desc "Open a browser tab to eval ClojureScript"
                    :connect (fn []
                               (let [ed (pool/last-active)
                                     default-url (find-cljs-browser-url ed)]
                                 (cmd/exec! :add-browser-tab default-url)
                                 (if default-url
                                   (tabs/active! ed)
                                   ;; Need timeout for message to show up after connection message
                                   (js/setTimeout (fn [] (notifos/set-msg! "No file or url found for cljs connection. Enter a valid one in the browser"
                                                                           {:class "error"}))
                                                  10000))))})

(cmd/command {:command :client.refresh-connection
              :desc "Client: Refresh client connection"
              :exec (fn []
                      (when-let [client (-> (pool/last-active) deref :client :exec)]
                        (object/raise client :client.refresh!)))})
