(ns lighttable.nrepl.eval
  (:require [clj-stacktrace.repl :as stack]
            [clojure.pprint :refer [pprint]]
            [clojure.test :as test]
            [lighttable.nrepl.core :as core]
            [lighttable.nrepl.exception :as exception]
            [clojure.string :as string]
            [clojure.tools.nrepl.transport :as transport]
            [clojure.tools.nrepl.middleware :refer [set-descriptor!]]
            [clojure.tools.nrepl.middleware.interruptible-eval :refer [interruptible-eval *msg*]]
            [clojure.tools.nrepl.misc :refer [response-for returning]]
            [ibdknox.tools.reader :as reader]
            [ibdknox.tools.reader.reader-types :as rt])
  (:import java.io.Writer))

(defn try-read [rdr]
  (when rdr
    (reader/read rdr false ::EOF)))

(defn lined-read [string]
  (let [rdr (rt/indexing-push-back-reader string)]
    (take-while #(not= ::EOF %) (repeatedly #(try-read rdr)))))

(defn find-form [forms pos]
  (let [cur-line (inc (:line pos))
        cur-col (:ch pos)]
    (loop [prev nil
           left forms]
      (when-let [f (first left)]
        (let [{:keys [line end-line column end-column]} (meta f)]
          (cond
           (and (symbol? f)
                (= line cur-line)) f
           (and end-line line
                    (<= line cur-line)
                    (>= end-line cur-line)) f
           :else (recur f (rest left))))))))

(defn is-non-clojure? [s]
  (and (= (get (pr-str s) 0) \#)
       (not (set? s))))

(defn ->ns-sym [nsp]
  (symbol (str nsp)))

(defn trim-last [s n]
  (let [size (count s)]
    (subs s 0 (- size n))))

(defn meta? [thing]
  (if (instance? clojure.lang.IObj thing)
    (meta thing)))

(defn clean-serialize [res & [opts]]
  (binding [*print-length* (or (:print-length opts) *print-length* 1000)]
    (cond
     (fn? res) 'fn
     (var? res) (if-not (:allow-var? opts)
                  res
                  (str res)
                  )
     (nil? res) "nil"
     (false? res) "false"
     (and (instance? clojure.lang.Atom res)
          (:result opts)) (str "atom[" @res "]")
     (instance? clojure.lang.Atom res) (str "atom")
     ;(is-non-clojure? res) (str res)
     (and (string? res) (:verbatim opts)) res
     :else (pr-str res))))

(defn truncate [v]
  v)

(defn ->result [opts f]
  (try
    (let [m (meta? f)
          res (eval f)]
      {:meta m
       :form f
       :result (if (:verbatim opts)
                 res
                 (clean-serialize res opts))})
    (catch Throwable e
      (try
        (let [trace (exception/clean-trace e)
              msg (or (.getMessage e) (str e))]
          {:meta (meta f)
           :form f
           :result msg
           :stack trace
           :ex true})
        (catch Throwable e2
          (let [msg (str (.getName (class e)) ": " (.getMessage e) (ex-data e))]
            {:meta (meta f)
             :form f
             :result msg
             :stack msg
             :ex true})
          )))))

(defn require|create-ns [ns]
  (try
    (require ns)
    (create-ns ns)
    (catch java.io.FileNotFoundException e
      ;;it doesn't exist so we just need to create it
      (binding [*ns* (find-ns 'user)]
        (eval (list 'ns ns)))
      (create-ns ns)
      )))

(defn prep-code [{:keys [code meta]}]
  (if (or (not meta)
          (not (:start meta)))
    code
    (str (reduce str "" (repeat (:start meta 0) "\n"))
         code)))

(defn watch [v meta]
  (let [ppv (with-out-str (pprint v))
        data {:meta meta :result (subs ppv 0 (dec (count ppv)))}]
    (core/safe-respond-to (:obj meta) :editor.eval.clj.watch data))
  v)

(defn eval-clj [fs cur-ns & [opts]]
  (let [results (doall (filter #(not (var? (:result %))) (map (partial ->result opts) fs)))]
    {:results (if (:no-form opts)
                (map #(dissoc % :form) results)
                results)
     :ns (->ns-sym *ns*)}))

(defn find-eval-frame [stack]
  (first (filter #(re-seq  #"\$eval[\d]+" (.getClassName %)) stack)))

(defn ->ns [content]
  (try
    (let [c (read-string content)]
      (name (first (filter symbol? (rest c)))))
    (catch Exception e
      )))

(defn file->ns [path]
  (when (and path (not (empty? path)))
    (try
      (let [ns-name (->ns (slurp path))]
        (when-not (empty? ns-name)
          ns-name))
      (catch Exception e
        nil))))

(defn get-line [e pos]
  (let [stack (.getStackTrace e)
        e-str (str e)]
    {:line (or (-> (re-seq #"starting at line ([\d]+)" e-str) first second)
               (:line pos)
               (when stack
                 (-> stack
                     (find-eval-frame)
                     (or (aget stack 0))
                     (.getLineNumber))))}))

(defn normalize-ns [ns path]
  (let [ns (str ns)
        cur-ns (if (empty? ns) nil ns)
        cur-ns (or cur-ns (file->ns path) "user")]
    cur-ns))

(defmethod core/handle "editor.eval.clj" [{:keys [ns path code meta pos transport session verbatim] :as msg}]
  (try
  (let [cur-ns (normalize-ns ns path)
        extra-bindings {#'*ns* (require|create-ns (symbol cur-ns))
                        #'test/*test-out* (@session #'*out*)
                        #'*file* path
                        #'*source-path* path}
        bindings (merge @session extra-bindings)]
    (try
      (with-bindings bindings
        (let [code (prep-code msg)
              forms (lined-read code)
              forms (if-not pos
                      forms
                      [(find-form forms pos)])]
          (when pos
            (core/respond msg :editor.eval.clj.location (clojure.core/meta (first forms))))
          (if-not (first forms)
            (core/respond msg :editor.eval.clj.no-op {})
            (core/respond msg :editor.eval.clj.result (-> (eval-clj forms
                                                                   cur-ns
                                                                   {:allow-var? true
                                                                    :no-form true
                                                                    :verbatim (:verbatim meta)
                                                                    :print-length (:print-length msg)
                                                                    :result true})
                                                          (assoc :meta (or meta {})))))

          ))
      (catch Exception e
        (let [e (or (.getCause e) e)
              ex (ex-data e)
              ex (if ex
                   ex
                   (get-line e pos))]
            (core/respond msg :editor.eval.clj.exception {:result (str e)
                                                          :stack (exception/clean-trace e)
                                                          :meta {:end-line (:line ex 1)}}))))
    bindings)
    (catch Exception e
      (let [cur-ns (normalize-ns ns path)
            e (or (.getCause e) e)
              ex (ex-data e)
              ex (if ex
                   ex
                   (get-line e pos))]
            (core/respond msg :editor.eval.clj.exception {:result (str "Failed trying to require " cur-ns " with: " e)
                                                          :stack (str "Failed trying to require " cur-ns " with: " (exception/clean-trace e))
                                                          :meta {:end-line (:line ex 1)}}))
      @session
      )))

(defmethod core/handle "editor.eval.clj.cancel" [msg]
  ((interruptible-eval (:h msg)) (assoc msg :op "interrupt")))

(defmethod core/handle "client.cancel-all" [msg]
  ((interruptible-eval (:h msg)) (assoc msg :op "interrupt")))
