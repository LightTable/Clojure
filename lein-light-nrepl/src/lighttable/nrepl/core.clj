(ns lighttable.nrepl.core
  (:require [clojure.tools.nrepl.server :refer [start-server stop-server default-handler]]
            [clojure.tools.nrepl.transport :as transport]
            [clojure.tools.nrepl.middleware.session :refer [session] :as sess]
            [clojure.tools.nrepl.middleware.interruptible-eval :refer [interruptible-eval *msg*]]
            [clojure.tools.nrepl.misc :refer [response-for returning]]
            [clojure.tools.nrepl.middleware :refer [set-descriptor!]]
            [cheshire.core :as cheshire]
            [clj-stacktrace.repl :refer [pst+]]
            [fs.core :as fs]
            [clojure.repl :as repl]))

(def ^{:dynamic true} *ltmsg* nil)
(def server (atom nil))
(def clients (atom {}))
(def old-out System/out)
(def old-err System/err)
(def old-*out* *out*)
(def old-*err* *err*)
(def my-settings (atom {:name "clj"
                        :dir (fs/absolute-path fs/*cwd*)
                        :type "lein-light-nrepl"
                        :commands [:editor.eval.clj
                                   :editor.clj.doc
                                   :editor.cljs.doc
                                   :editor.clj.hints
                                   :editor.cljs.hints
                                   :docs.clj.search
                                   :docs.cljs.search
                                   :editor.eval.clj.sonar
                                   :editor.eval.clj.cancel
                                   :editor.eval.cljs
                                   :cljs.compile]}))

(defmulti handle :op)

(def no-queue? #{"editor.eval.clj.cancel" "client.cancel-all"})

(defn lt-op? [op]
  (if-not op
    nil
  (or (> (.indexOf op "editor.") -1)
      (> (.indexOf op "client.") -1)
      (> (.indexOf op "doc.") -1)
      (> (.indexOf op "clj.") -1)
      (> (.indexOf op "cljs.") -1)
      )))

(def queue-eval
  #'clojure.tools.nrepl.middleware.interruptible-eval/queue-eval)
(def configure-executor
  #'clojure.tools.nrepl.middleware.interruptible-eval/configure-executor)

(defn settings! [setts]
  (swap! my-settings merge setts))

(defn respond
  ([msg op data]
   (respond msg op data "edn"))
  ([msg op data encoding]
   (let [data (case encoding
                "edn" (binding [*print-readably* true] (pr-str data))
                "json" (cheshire/generate-string data))]
     (if-not (:transport msg)
       (.println old-out (str "no transport: " msg))
       (transport/send (:transport msg) (response-for msg {:op (name op) :id (or (:id msg) (:client-id @my-settings)) :encoding encoding :data data}))))))

(defn broadcast [op data]
  (doseq [client (vals @clients)]
    (respond client op data)))

(defn broadcast-to [id op data]
  (doseq [client (vals @clients)]
    (respond (assoc client :id id) op data)))

(defn safe-respond-to [id op data]
  (if *ltmsg*
    (respond (assoc *ltmsg* :id id) op data)
    (broadcast-to id op data)))

(defn capture-client [msg]
  (swap! clients assoc (-> msg :session meta :id) (select-keys msg [:session :transport])))

(defn remove-client [msg]
  (swap! clients dissoc (-> msg :session meta :id)))

(defn queued [{:keys [op session id transport] :as msg} executor]
  (queue-eval session executor
              (comp
               (partial reset! session)
               (fn []
                 (try
                 (alter-meta! session assoc
                              :thread (Thread/currentThread)
                              :eval-msg msg)
                 (binding [*msg* msg
                           *ltmsg* msg]
                   (let [result (handle msg)
                         ;; do not let a bad handler nuke the session and as a result kill a connection
                         result (if-not result
                                  @session
                                  (dissoc result #'*msg* #'*ltmsg*))]
                     (returning result
                                (transport/send
                                 transport (response-for msg :status :done))
                                (alter-meta! session dissoc :thread :eval-msg))))
                   (catch Exception e
                     (.printStackTrace e)))))))


(defn out-writer [& [ev echo?]]
  (let [o (Object.)
        writer-id (gensym "writer")
        closed (atom false)
        print-id (atom 0)
        length (fn [^java.io.Writer me] (.. me getBuffer length))
        do-flush (fn [^java.io.Writer me]
                   (locking o
                     (let [len (length me)]
                       (when (> len 0)
                         (let [text (.. me getBuffer (substring 0 len))]
                           (when echo?
                             (.print old-out text))
                           (if *ltmsg*
                             (respond *ltmsg* (or ev :editor.eval.clj.print) {:out text :id (str writer-id @print-id)})
                             (broadcast (or ev :editor.eval.clj.print) {:out text :id (str writer-id @print-id)}))
                           (.. me getBuffer (delete 0 len)))))))
        writer (proxy [java.io.StringWriter] []
                 (close [] (reset! closed true))
                 (write [& [x ^Integer off ^Integer len]]
                        (locking o
                          (cond
                           len (proxy-super write x off len)
                           off (proxy-super write x off)
                           :else (proxy-super write x))))
                 (flush []
                        (do-flush this)
                        (swap! print-id inc)
                        ))]
    (future (while (not @closed)
              (Thread/sleep 50)
              (do-flush writer)))
    writer))

(defn out-stream [writer]
  (-> (java.io.PrintWriter. writer false)
      (org.apache.commons.io.output.WriterOutputStream.)
      (java.io.PrintStream. true)))

(defn redirect-io [msg]
  (let [out (out-writer "editor.eval.clj.print" true)
        err (out-writer "editor.eval.clj.print.err" true)
        out-s (out-stream out)
        err-s (out-stream err)]
    (System/setOut out-s)
    (System/setErr err-s)
    (alter-var-root #'*out* (fn [_] out))
    (alter-var-root #'*err* (fn [_] err))
    ))

(defn restore-io []
  (System/setOut old-out)
  (System/setErr old-err)
  (alter-var-root #'*out* (fn [_] old-*out*))
  (alter-var-root #'*err* (fn [_] old-*err*)))

(defn start [info]
  ;(reset! server (start-server :port 7888 :handler (default-handler #'lighttable-ops)))
  )

(comment
(start {})
(stop-server @server)
  )
