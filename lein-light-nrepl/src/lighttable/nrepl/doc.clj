(ns lighttable.nrepl.doc
  (:require [lighttable.nrepl.core :as core]
            [lighttable.nrepl.eval :as eval]
            [lighttable.nrepl.cljs :as cljs]
            [cljs.env :as env]
            [cljs.compiler :as comp]
            [cljs.analyzer :as ana]))

(defn clean-meta [m]
  (when m
    (-> m
        (select-keys [:ns :name :doc :arglists :file :line :macro])
        (update-in [:ns] str)
        )))

(defn str-contains? [orig search]
  (> (.indexOf orig search) -1))

(defn format-result [m]
  (when m
    (-> m
        (assoc :args (-> m :arglists str))
        (dissoc :arglists))))

(defn format-cljs-result [m]
  (when m
    (-> m
        (assoc :name (-> m :name name)
          :ns (-> m :name namespace)
          :args (-> m :arglists second str))
        (dissoc :arglists)
        )))

(defn find-doc [search]
    (let [ms (concat (mapcat #(sort-by :name (map meta (vals (ns-interns %))))
                             (all-ns)))]
      (for [m ms
              :when (and (:doc m)
                         (not (:private m))
                         (or (str-contains? (:doc m) search)
                             (str-contains? (str (:ns m)) search)
                             (str-contains? (str (:name m)) search)))]
               (format-result (clean-meta m)))))

(defn dmeta [nsp sym]
  (-> (ns-resolve (symbol nsp) sym)
      (meta)
      (clean-meta)))

(defn get-doc [nsp sym]
    (let [sym (symbol sym)
          x (try (dmeta nsp sym)
              (catch Exception e))]
      (format-result x)))

(defn cljs-find-doc [search]
  (env/with-compiler-env cljs/compiler-env
                      (let [ms (mapcat #(->> (:defs %)
                                             (vals)
                                             (sort-by :name)
                                             (map clean-meta)) (-> @env/*compiler* :cljs.analyzer/namespaces vals))]
                        (for [m ms
                              :when (and (:doc m)
                                         (not (:private m))
                                         (or (str-contains? (:doc m) search)
                                             (str-contains? (str (:ns m)) search)
                                             (str-contains? (str (:name m)) search)))]
                          (format-cljs-result m)))))

(defn get-cljs-doc [nsp sym]
  (env/with-compiler-env cljs/compiler-env
                      (->
                       (ana/resolve-var {:ns ((-> @env/*compiler* :cljs.analyzer/namespaces) (symbol nsp))} (symbol sym))
                       (clean-meta)
                       (format-cljs-result))))

(defmethod core/handle "editor.clj.doc" [{:keys [ns sym loc session path result-type] :as msg}]
  (let [ns (eval/normalize-ns ns path)
        _ (eval/require|create-ns (symbol ns))
        res (get-doc ns sym)
        res (when res (assoc res :loc loc :result-type result-type))]
    (core/respond msg "editor.clj.doc" res))
  @session)

(defmethod core/handle "editor.cljs.doc" [{:keys [ns sym loc session path result-type] :as msg}]
  (env/with-compiler-env cljs/compiler-env
                         (let [ns (eval/normalize-ns ns path)]
                           (eval/require|create-ns (symbol ns))
                           (cljs/init-cljs (symbol ns) path)
                           (let [clj (get-doc 'clojure.core sym)
                                 res (if (:macro clj)
                                       clj
                                       (get-cljs-doc ns sym))
                                 res (when res (assoc res :loc loc :result-type result-type))]
                             (core/respond msg "editor.cljs.doc" res))))
  @session)

(defmethod core/handle "docs.clj.search" [{:keys [search session] :as msg}]
  (core/respond msg "doc.search.results" (find-doc search))
  @session)

(defmethod core/handle "docs.cljs.search" [{:keys [search session] :as msg}]
  (core/respond msg "doc.search.results" (cljs-find-doc search))
  @session)

