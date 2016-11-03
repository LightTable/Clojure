(ns lighttable.nrepl.doc
  (:require [lighttable.nrepl.core :as core]
            [lighttable.nrepl.eval :as eval]
            [lighttable.nrepl.cljs :as cljs]
            [clojure.java.io :as io]
            [clojure.string :as string]
            [cljs.env :as env]
            [cljs.compiler :as comp]
            [cljs.analyzer :as ana])
  (:import java.net.URL java.io.File))

(defn- next-row
  "Computes the value of the next row of the distance matrix, based on the
  values from the previous row."
  [pre-row char1 str2]
  (let [init-val [(inc (first pre-row))]
        row   (fn [crow [diagonal above char2]]
                       (let [dist (if (= char2 char1) diagonal
                                    (inc (min diagonal above (peek crow))))]
                         (conj crow dist)))]
    (reduce row init-val (map vector pre-row (rest pre-row) str2))))


;;   Author: PLIQUE Guillaume (Yomguithereal)
;;   Source: https://gist.github.com/vishnuvyas/958488
(defn levenshtein
  "Compute the levenshtein distance (a.k.a edit distance) between two strings.
  Informally, the Levenshtein distance between two words is the minimum number
  of single-character edits (i.e. insertions, deletions or substitutions)
  required to change one word into the other"
  [str1 str2]
  (let [first-row  (range (inc (count str2)))]
    (peek (reduce #(next-row %1 %2 str2) first-row str1))))

(defn clean-meta
  "returns a hash-map with only these keys: :ns :name :doc :arglists
  :file :line :macro and updates :ns to a string"
  [m]
  (when m
    (-> m
        (select-keys [:ns :name :doc :arglists :file :line :macro])
        (update-in [:ns] str)
        )))

(defn str-contains? [orig search]
  (> (.indexOf orig search) -1))

(defn format-result
  "Returns a hash-map with `:args` as the original `:arglists` value. `:args` is converted to
  a string and dissociated from `:arglists`."
  [m]
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

(defn find-doc
  "Look for a var with name `search` among all namespaces. Only public
  vars with docstring are returned.

  Returns a list of metadata (max 30) hash-maps sorted by their levenshtein
  distance with the `search` input."
  [search]
  (let [with-dist  #(hash-map :dist (levenshtein search (str (:name %)))
                              :meta %)
        all-vars    (vals (apply merge (map ns-interns (all-ns))))
        dist-metas  (into [] (comp (map meta) (filter :doc) (remove :private)
                                   (map clean-meta) (map format-result)
                                   (map with-dist))
                            all-vars)]
      (take 30 (map :meta (sort-by :dist dist-metas)))))

(def jar-temp-files
  "Maps jar-url paths to temp files"
  (atom {}))

(defn jar-url->file
  "Given a jar-url, retrieve its cached tempfile or copy its contents to a
  tempfile and return it."
  [^URL jar-url]
  (or
   (get @jar-temp-files (.getPath jar-url))
   (let [[_ relative-name ext] (re-find #"!/(.*)(\.[^.]+)$" (.getPath jar-url))
         new-file (.getPath (File/createTempFile relative-name ext))
         body (-> jar-url .getContent slurp)]
     (swap! jar-temp-files assoc (.getPath jar-url) new-file)
     (spit new-file body)
     new-file)))

(defn resolve-file
  "Resolves a file to its full path. Jar paths are unpacked to a tempfile."
  [file]
  (when file
    (let [url (or (io/resource file)
                  (URL.
                   ;; cljs files don't have jar:file: or file: prefix off of metadata
                   (if (.contains file ".jar!/")
                     (string/replace-first file #"^file:" "jar:file:")
                     (string/replace-first file #"^/" "file:/"))))]
      (if (= "jar" (.getProtocol url))
        (jar-url->file url)
        (-> url io/file .getPath)))))

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
        res (some-> (get-doc ns sym)
                    (assoc :loc loc :result-type result-type)
                    (update-in [:file] resolve-file))]
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
                                 res (some-> res
                                             (assoc :loc loc :result-type result-type)
                                             (update-in [:file] resolve-file))]
                             (core/respond msg "editor.cljs.doc" res))))
  @session)

(defmethod core/handle "docs.clj.search" [{:keys [search session] :as msg}]
  (core/respond msg "doc.search.results" (find-doc search))
  @session)

(defmethod core/handle "docs.cljs.search" [{:keys [search session] :as msg}]
  (core/respond msg "doc.search.results" (cljs-find-doc search))
  @session)

