(ns lighttable.nrepl.handler
  (:require [clojure.tools.nrepl.server :refer [start-server stop-server default-handler]]
            [clojure.tools.nrepl.transport :as transport]
            [clojure.tools.nrepl.middleware.session :refer [session]]
            [clojure.tools.nrepl.middleware.interruptible-eval :refer [interruptible-eval *msg*]]
            [clojure.tools.nrepl.misc :refer [response-for returning]]
            [clojure.tools.nrepl.middleware :refer [set-descriptor!]]
            [lighttable.nrepl.core :as core]
            [lighttable.nrepl.eval :as eval]
            [lighttable.nrepl.sonar :as sonar]
            [lighttable.nrepl.cljs :as cljs]
            [lighttable.nrepl.doc :as doc]
            lighttable.nrepl.auto-complete
            [clj-stacktrace.repl :as stack :refer [pst+]]
            [fs.core :as fs]
            [clojure.repl :as repl]))

(defn with-lt-data [msg]
  (if (or (not (:data msg))
          (empty? (:data msg)))
    msg
    (merge (dissoc msg :data) (read-string (:data msg)))))

(defn lighttable-ops
  "Evaluation middleware that supports interrupts and tracking of source forms.
   Returns a handler that supports \"eval\" and \"interrupt\" :op-erations that
   delegates to the given handler otherwise."
  [h & {:keys [executor] :or {executor (core/configure-executor)}}]
  (fn [{:keys [op session interrupt-id id transport] :as msg}]
    (cond
     (= op "client.close") (do
                             (core/remove-client msg)
                             (when (empty? @core/clients)
                               (core/restore-io))
                             (when-not (:remote @core/my-settings)
                                (System/exit 0)))
     (= op "client.init") (do
                            (core/capture-client msg)
                            (core/redirect-io msg)
                            (when-let [setts (-> msg with-lt-data :settings)]
                              (core/settings! setts))
                            (core/respond msg "client.settings" (dissoc @core/my-settings :project))
                            (let [out (core/out-writer)
                                  err (core/out-writer "editor.eval.clj.print.err")]
                              (swap! session assoc
                                     #'*out* out
                                     #'*err* err)))
     (core/no-queue? op) (core/handle msg)
     (core/lt-op? op) (core/queued (-> msg
                                       (assoc :h h)
                                       (with-lt-data))
                                   executor)
     :else (h msg))))

(set-descriptor!
 #'lighttable-ops
 {:requires #{#'session}
  :expects #{}})
