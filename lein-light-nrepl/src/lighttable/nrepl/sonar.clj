(ns lighttable.nrepl.sonar
  (:use [clojure.pprint :only [pprint]])
  (:require [lighttable.nrepl.core :as core]
            [lighttable.nrepl.eval :as eval]
            [lighttable.nrepl.exception :as exception]
            [clojure.test :as test]
            [clojure.walk :as walk]
            [cljs.compiler :as compiler]
            [cljs.env :as cljs-env]
            [ibdknox.analyzer :as cljs]
            [clojure.set :as set]))

(def ^{:dynamic true} *logs* (atom {}))
(def ^{:dynamic true} *func-stuff* (atom {}))
(def ^{:dynamic true} *func* :none)
(def ^{:dynamic true} *caps* (atom {}))

(defn clean-cap [v]
  (-> v (eval/clean-serialize) eval/truncate))

(defn ->cap-sym [s]
  (let [{:keys [line column]} (meta s)
        str-sym (if (symbol? s)
                  (name s)
                  s)]
    (when (and line column)
      [line column str-sym])))

(defn log-kv [k v]
  (swap! *caps* assoc (->cap-sym k) (clean-cap v))
  v)

(defn wrap-log [[local v]]
  (if (symbol? local)
    [local `(log-kv (quote ~local) ~v)]
    [local v]))

(defmacro def++ [& body]
  (let [k (first (filter symbol? body))]
    `(do (def ~@body)
       (log-kv '~k ~k)
       (var ~k))))

(defmacro let++ [pairs & body]
  (let [pairs (partition 2 pairs)
        pairs (mapcat wrap-log pairs)]
  `(let ~(vec pairs) ~@body)))

(defn ->ns-sym [nsp]
  (symbol (str nsp)))

(defn restructure [syms vs]
  (zipmap (map ->cap-sym syms) (map clean-cap vs)))

(defn all-syms [cur]
  (let [syms (atom [])]
    (walk/postwalk (fn [s]
                     (if (and (symbol? s)
                              (not= s '&))
                       (do
                         (swap! syms conj s)
                         s)
                       s))
                    cur)
    @syms))

(defmacro defn++ [nme params & body]
  (if (vector? params)
    (let [cap-params (all-syms params)]
      `(defn ~nme ~params
         (swap! *caps* merge (restructure '~cap-params ~cap-params))
         nil
         ~@body))
    `(defn ~nme ~params ~@body)))

(defmacro fn++ [params & body]
  (if (vector? params)
    (let [cap-params (all-syms params)]
      `(fn ~params
         (swap! *caps* merge (restructure '~cap-params ~cap-params))
         nil
         ~@body))
    `(fn ~params ~@body)))

(defmacro fn*++ [params & body]
  (if (vector? params)
    (let [cap-params (all-syms params)]
      `(fn* ~params
         (swap! *caps* merge (restructure '~cap-params ~cap-params))
         nil
         ~@body))
    `(fn* ~params ~@body)))

(defmacro defmacro++ [& args]
  `(defmacro ~@args))

(defmacro deftype++ [& args]
  `(deftype ~@args))

(defmacro defrecord++ [& args]
  `(defrecord ~@args))

(defmacro doseq++ [pairs & body]
  (let [pairs (partition 2 pairs)
        pairs (mapcat wrap-log pairs)]
  `(doseq ~(vec pairs) ~@body)))

(defmacro for++ [pairs & body]
  (let [pairs (partition 2 pairs)
        pairs (mapcat wrap-log pairs)]
  `(for ~(vec pairs) ~@body)))

(defmacro macroexpand-1++ [& body]
  `(macroexpand-1 ~@body))

(defn capture-let [forms]
  (for [f forms]
    (if-not (eval/meta? f)
      f
      (let [walked  (walk/prewalk-replace
                     {'let 'lighttable.nrepl.sonar/let++
                      'def 'lighttable.nrepl.sonar/def++
                      'for 'lighttable.nrepl.sonar/for++
                      'doseq 'lighttable.nrepl.sonar/doseq++
                      'defn 'lighttable.nrepl.sonar/defn++
                      'fn 'lighttable.nrepl.sonar/fn++
                      'fn* 'lighttable.nrepl.sonar/fn*++
                      'defrecord 'lighttable.nrepl.sonar/defrecord++
                      'deftype 'lighttable.nrepl.sonar/deftype++
                      'macroexpand-1 'lighttable.nrepl.sonar/macroexpand-1++
                      'defmacro 'lighttable.nrepl.sonar/defmacro++}
                     f)]
        (if (and walked
                 (instance? clojure.lang.IObj walked))
          (with-meta walked (eval/meta? f))
          f)))))


(defn ->ns [content]
  (let [c (read-string content)]
    (name (first (filter symbol? (rest c))))))

(defn deref-form? [f]
  (when (coll? f)
    (= (first f) 'clojure.core/deref)))

(defn cat [func expr]
  (apply concat
    (when-let [res (func expr)] [res])
    (map (partial cat func) (:children expr))))

(defn ops [expr]
  (when-let [o (:op expr)]
    o))

(defn by-op-type [op]
  (fn [expr]
    (when (= op (:op expr))
      expr)))

(defn ->usages [forms]
  (let [non-symbol-forms (filter #(and (not (symbol? %))
                                       (not (nil? %))
                                       (not (deref-form? %))) forms)
        vars (cat (by-op-type :var)
                  (cljs-env/with-compiler-env (cljs-env/default-compiler-env)
                                              (cljs/analyze {:locals {}} non-symbol-forms)))]
    (reduce (fn [all cur]
              (let [root (cur :info)
                    root (or (:sym root) (:name root))
                    s (->cap-sym root)]
                (if (or (not s)
                        (not (@*caps* s)))
                  all
                  (conj all {:root s :cur (->cap-sym (:form cur))}))))
            []
            vars)))

(defn result->cap [r]
  (let [{:keys [meta result form ex stack]} r]
    (when meta
      (let [{:keys [end-line end-column line column]} meta
            [l c] (if-not (and end-line end-column)
                    [(inc line) (+ column (count (pr-str form)))]
                    [end-line end-column])]
        (if ex
          {:root :ex :cur [l c result stack]}
          {:root :result :cur [l c result]})))))

(def prev-forms (atom nil))

(defmethod core/handle "editor.eval.clj.sonar" [{:keys [ns path code pos transport session auto?] :as msg}]
  (let [cur-ns (symbol (or ns "user"))
        extra-bindings {#'*ns* (eval/require|create-ns cur-ns)
                        #'cljs/*cljs-ns* cur-ns
                        #'test/*test-out* (@session #'*out*)
                        #'*logs* (atom {})
                        #'*func-stuff* (atom {})
                        #'*caps* (atom {})
                        #'*file* path
                        #'*source-path* path}
        bindings (merge @session extra-bindings)]
    (with-bindings bindings
      (try
        (let [code (eval/prep-code msg)
              forms (eval/lined-read code)]
        (if (and auto?
                 (= @prev-forms forms))
          (core/respond msg :editor.eval.clj.sonar.noop {})
          (let [_ (reset! prev-forms forms)
                neue-form (capture-let forms)
                cur-forms (if pos
                            [(eval/find-form neue-form pos)]
                            neue-form)
                {:keys [results ns]} (eval/eval-clj cur-forms cur-ns {:truncate false :result true :print-length (or (:print-length msg) 5000)})
                result (filter identity (map result->cap results))
                uses (->usages forms)
                caps (map (fn [x] {:root x :cur x}) (keys @*caps*))
                all (sort-by :cur (filter :cur (concat uses result caps)))]
            (core/respond msg :editor.eval.clj.sonar.result {:ns ns :vals (pr-str (dissoc @*caps* nil)) :uses all}))))
        (catch Exception e
          ;;reset the prev-form so that on fixing it re-evals
          (reset! prev-forms nil)
          (let [ex (ex-data e)]
            (core/respond msg :editor.eval.clj.exception {:stack (exception/clean-trace e)
                                                          :msg (.getMessage e)
                                                          :meta {:end-line (:line ex)}})))))
    bindings))

