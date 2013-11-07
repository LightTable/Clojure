(ns lighttable.nrepl.cljs
  (:require [clj-stacktrace.repl :as stack]
            [clojure.pprint :refer [pprint]]
            [clojure.test :as test]
            [clojure.string :as string]
            [fs.core :as fs]
            [lighttable.nrepl.eval :as eval]
            [lighttable.nrepl.core :as core]
            [lighttable.nrepl.exception :as exception]
            [cljs.compiler :as comp]
            [cljs.analyzer :as cljs]
            [cljs.source-map :as sm]
            [clojure.test :as test]
            [cljs.closure :as cljsc]
            [clojure.java.io :as io]
            [clojure.set :as set :refer [difference union intersection]]
            [clojure.tools.nrepl.transport :as transport]
            [clojure.tools.nrepl.middleware :refer [set-descriptor!]]
            [clojure.tools.nrepl.middleware.interruptible-eval :refer [interruptible-eval *msg*]]
            [clojure.tools.nrepl.misc :refer [response-for returning]]
            [ibdknox.tools.reader :as reader]
            [ibdknox.tools.reader.reader-types :as rt])
  (:import java.io.Writer))



(defn without
  "Returns set s with x removed."
  [s x] (difference s #{x}))

(defn take-1
  "Returns the pair [element, s'] where s' is set s with element removed."
  [s] {:pre [(not (empty? s))]}
  (let [item (first s)]
    [item (without s item)]))

(defn no-incoming
  "Returns the set of nodes in graph g for which there are no incoming
  edges, where g is a map of nodes to sets of nodes."
  [g]
  (let [nodes (set (keys g))
        have-incoming (apply union (vals g))]
    (difference nodes have-incoming)))

(defn normalize
  "Returns g with empty outgoing edges added for nodes with incoming
  edges only.  Example: {:a #{:b}} => {:a #{:b}, :b #{}}"
  [g]
  (let [have-incoming (apply union (vals g))]
    (reduce #(if (get % %2) % (assoc % %2 #{})) g have-incoming)))

(defn kahn-sort
  "Proposes a topological sort for directed graph g using Kahn's
   algorithm, where g is a map of nodes to sets of nodes. If g is
   cyclic, returns nil."
  ([g]
     (kahn-sort (normalize g) [] (no-incoming g)))
  ([g l s]
     (if (empty? s)
       (when (every? empty? (vals g)) l)
       (let [[n s'] (take-1 s)
             m (g n)
             g' (reduce #(update-in % [n] without %2) g m)]
         (recur g' (conj l n) (union s' (intersection (no-incoming g') m)))))))


(def env (atom {}))

(defn ns->cljs-file [s]
  (str (string/replace (munge (str s)) \. \/) ".cljs"))

(defn file|resource->file [file]
  (println "This is a file: " file)
  (cond
   (not file) nil
   (fs/exists? file) file
   :else (let [res (io/resource file)
               path (str res)]
           (when res
             (if (> (.indexOf path "jar") -1)
               res
               (fs/absolute-path res))))))

(def cljs-ns-keys #{:uses :requires :uses-macros :requires-macros :name :imports})

(defmacro with-cljs-env [cur & body]
  `(let [file# (:file ~cur)
         cur-ns# (or (-> ~cur :ns :name) 'cljs.user)]
     (with-bindings {#'*ns* (eval/require|create-ns cur-ns#)
                     #'cljs/*cljs-ns* cur-ns#
                     #'*file* file#
                     #'comp/*cljs-source-map* (atom (sorted-map))
                     #'comp/*cljs-gen-col* (atom 0)
                     #'comp/*cljs-gen-line* (atom 0)
                     #'cljs/*cljs-file* file#
                     #'*source-path* file#}
       (cljs.compiler/with-core-cljs
        ~@body))))

(defn with-forms [{:keys [file] :as cur}]
  (let [file (file|resource->file file)]
    (when file
      (let [file-loc (str file)
            mtime (when (fs/exists? file-loc) (fs/mod-time (io/as-file file)))]
        (with-cljs-env cur
          (assoc cur
            :forms (eval/lined-read (slurp file))
            :mtime mtime))))))

(defn analyze [env form]
  (let [ast (cljs/analyze (assoc env :ns (@cljs/namespaces cljs/*cljs-ns* {})) form)]
    (set! *ns* (create-ns cljs/*cljs-ns*))
    ast))

(defn with-analysis [{:keys [forms file] :as cur}]
  (println "ANALYZING")
  (when forms
    (with-cljs-env cur
      (let [env (assoc (cljs/empty-env) :file file)]
        (let [results (mapv (partial analyze env) forms)
              ns (@cljs/namespaces cljs/*cljs-ns* {})]
          (assoc cur
            :analysis results
            :name (-> ns :name)
            :ns (select-keys ns cljs-ns-keys)
            :deps (set/union (-> (:requires ns) vals set)
                             (-> (:uses ns) vals set)
                             (when-not (= (-> ns :name) 'cljs.core)
                               #{'cljs.core}))))))))

(defn with-js [{:keys [analysis file] :as cur}]
  (when analysis
    (with-cljs-env cur
      (let [js (reduce #(str % %2 "\n") "" (map comp/emit-str analysis))
            sm (sm/encode {file @comp/*cljs-source-map*}
                         {:lines (inc @comp/*cljs-gen-line*)
                          :file  (str file ".map")})]
        (assoc cur
          :js js
          :lines (inc @comp/*cljs-gen-line*)
          :source-map-internal @comp/*cljs-source-map*
          :source-map sm)))))

(defn cljs-dep [{:keys [ns file]}]
  (println "compiling: " file ns)
  (when-let [dep (-> {:file (or file (ns->cljs-file ns))}
                     (with-forms)
                     (with-analysis)
                     (with-js))]
    {(-> dep :name) dep}))

(defn js-dep [{:keys [ns]}]
  (println "getting js: " ns)
  (when-let [dep (first (cljsc/js-dependencies {} [(str ns)]))]
    (println dep)
    (let [primary (-> dep :provides first symbol)
          deps (:requires dep)
          deps (if (not= ns 'goog)
                 (conj deps 'goog)
                 deps)]
      (into {primary {:js (slurp (io/resource (:file dep)))
                      :name ns
                      :deps (map symbol deps)}}
            (map #(vector (symbol %) primary) (rest (:provides dep)))))))

(defn dep->deps [dep]
  (set (mapcat #(-> % second :deps) dep)))

(defn transitive [dep {:keys [seen available] :as cur}]
  (loop [all dep
         left (set/difference (dep->deps dep) seen)
         seen seen]
    (if-not (seq left)
      all
      (let [cur-ns (first left)
            dep (if-let [avail (get available cur-ns)]
                  {cur-ns avail}
                  (or (js-dep {:ns cur-ns}) (cljs-dep {:ns cur-ns})))
            [seen all] (if (or (not cur-ns) (not dep))
                         [(conj seen cur-ns) all]
                         [(apply conj seen (keys dep)) (merge all dep)])
            left (set/difference (into left (dep->deps dep)) seen)]
        (recur all left seen)
        ))))

(defn transitive-all [{:keys [ignore nss files available]}]
  (let [type (if nss
               :ns
               :file)
        ignore (set ignore)
        up-to-date? (into {} (map (juxt :file :name) (vals available)))]
    (reduce (fn [final cur-file]
              (let [transitive-opts {:seen (into ignore (set (keys final))) :available available}]
                (if-let [current (available (or (up-to-date? cur-file) cur-file))]
                  (merge final (transitive {(:name current) current} transitive-opts))
                  (merge final (transitive (cljs-dep {type cur-file}) transitive-opts)))))
            {}
            (or files nss))))

(defn dep-graph [all]
  (into {} (filter identity (for [dep (vals all)]
                              (when (map? dep)
                                [(:name dep) (set (:deps dep))])))))

(defn ordered-deps [all]
  (->> (-> (dep-graph all)
           (kahn-sort)
           (reverse))
       (map all)
       (filterv identity)))

(defn ordered-js [deps]
  (reduce (fn [final cur]
            (str final (:js cur)))
          ""
          deps))

(defn offset-source-map [map offset]
  (into map
        (for [[line col-map] map]
          [line (into col-map
                      (for [[col items] col-map]
                        [col (mapv #(update-in % [:gline] + offset) items)]))])))

(defn concat-source-maps [ordered file]
  (let [concated (reduce (fn [final cur]
                           (let [lines (+ (:lines final) (:lines cur))]
                             (assoc final
                               :lines lines
                               :combined (merge (:combined final) {(:file cur) (offset-source-map (:source-map-internal cur) lines)}))))
                         {:lines 0
                          :combined {}}
                         (filter :source-map-internal ordered))]
    {:source-map (sm/encode (:combined concated)
                         {:lines (:lines concated)
                          :file  (str file ".map")})
     :source-map-internal (:combined concated)}
    ))

(defn find-cycles [cur {:keys [seen root stack graph] :as state}]
  (first (filter identity (for [c (remove seen cur)]
                            (if (= c root)
                              (conj stack c)
                              (find-cycles (get graph c) (-> state
                                                             (update-in [:stack] conj c)
                                                             (update-in [:seen] conj c))))))))

(defn ->cycles [graph]
  (filterv identity
           (for [[root deps] graph
                 :let [stack (find-cycles deps {:seen #{} :stack [root] :graph graph :root root})]]
             stack)))


(defn compile-all [to-compile]
  (let [all (transitive-all to-compile)]
    {:namespaces all
     :ignore (:ignore to-compile)}))

(defn with-provides [compiled]
  (let [all (:namespaces compiled)
        graph (dep-graph all)
        provided (set (keys all))]
    (assoc compiled
      :provides provided
      :missing (-> (apply set/union (vals graph))
                   (set/difference provided)
                   (set/difference (:ignore compiled))))))

(defn with-ordered-deps [{:keys [namespaces] :as cur}]
  (let [ordered (ordered-deps namespaces)]
    (if (seq ordered)
      (assoc cur :ordered ordered)
      (assoc cur :cycles (->cycles (dep-graph namespaces))))))

(defn with-merged-js [{:keys [ordered source-map] :as cur}]
  (when ordered
    (merge cur
           (concat-source-maps ordered source-map)
           {:js (str (ordered-js ordered) "\n//# sourceMappingURL=" source-map)})))

(defn remove-modified [namespaces]
  (let [moded (reduce (fn [to-remove cur]
                        (let [file (file|resource->file (:file cur))
                              mtime (when (and file (fs/exists? (str file)))
                                      (fs/mod-time (io/as-file file)))]
                          (if (and file (:mtime cur) (not= (:mtime cur) mtime))
                            (conj to-remove (:name cur))
                            to-remove)))
                      []
                      (vals namespaces))]
    (apply dissoc namespaces moded)))

(defn as-viewable [compiled]
  (let [compiled (dissoc compiled :namespaces)
        compiled (if (:ordered compiled)
                   (assoc compiled :ordered (mapv #(dissoc % :analysis :ns) (:ordered compiled)))
                   compiled)]
    compiled))

(defmethod core/handle "cljs.compile" [{:keys [ignore files nss merged? cljsbuild? session] :as msg}]
  (let [compiled  (-> (compile-all {:ignore (or ignore [])
                                    :nss nss
                                    :files files
                                    :available (remove-modified @env)})
                      (with-provides)
                      (with-ordered-deps)
                      (with-merged-js))
        final (if merged?
                (select-keys compiled [:provides :missing :cycles :js :source-map])
                (-> (select-keys compiled [:provides :missing :cycles :js :source-map])
                    (assoc :ordered (mapv #(select-keys % [:name :js :source-map]) (:ordered compiled)))))]
    (reset! env (:namespaces compiled))
    (core/respond msg :cljs.compile.results final)
    @session))


(comment

  (def cur

    (-> (compile-all {:ignore [] :nss ['cljstest.foo] :available (remove-modified (:namespaces cur))})
        (with-provides)
        (with-ordered-deps)
        (with-merged-js)
        ))

  (:cycles cur)

  (set (mapcat (juxt :file :name) (vals cur)))

  (keys cur)
  (->
   (remove-modified cur)
   (keys))

  (def sms (-> (full-output {:ignore ['cljs.core] :nss ["cljstest.bar"]})
               :sms
               first))

  (let [cur (decode sms)
        cur (first (vals cur))]
    (println cur)
    (offset-source-map cur 10)
    )
  (clojure.data.json/read-str sms :key-fn keyword)
  (defn decode [sms]
    (-> (clojure.data.json/read-str sms :key-fn keyword)
        (sm/decode)))

  (sm/merge-source-maps (decode sms) (decode sms))

  (map :name(ordered-deps (transitive-all {:ignore ['cljs.core] :nss ["cljstest.foo" "cljstest.zoo" "user"]})))

  (map #(:js (all %)) (-> {:ns "cljs.core"}
                         (transitive)
                         (dep-graph)
                         (kahn-sort)
                         (reverse)
                         ))
  (-> {:ns "user"}
      (transitive)
      (dep-graph)
      (kahn-sort)
      )
  (reduce str (map :js (vals
                        (-> {:ns "cljs.core"}
                            (transitive)
                            ))))
  (-> {:file "/Users/chris/lighttable/playground/src/lt/plugins/colors.cljs"}
      (transitive))
  )

(defn eval-cljs [env f]
  (let [stored-ns (@cljs/namespaces cljs/*cljs-ns*)
        env (assoc env :ns stored-ns)
        ast (cljs/analyze env f)]
    (when (= (:op ast) :ns)
      (set! *ns* (create-ns (symbol (:name ast))))
      (set! cljs/*cljs-ns* (symbol (:name ast))))
    {:meta (meta f)
     :code (if stored-ns
             (comp/emit-str ast)
             (do
               ;;fetch ns from file?
               (let [file (:file env)]
                 (when (and file (fs/exists? file))
                   (cljs/analyze-file (str "file://" file)))
                 (comp/emit-str (cljs/analyze (assoc env :ns (@cljs/namespaces cljs/*cljs-ns* {})) f)))))}))

(defn init-cljs [ns path]
  (when-not (@cljs/namespaces ns)
    (binding [cljs/*cljs-ns* 'cljs.user]
      (comp/with-core-cljs
       (cljs/analyze {:context :expr :ns {} :locals {}} (list 'ns ns))
       (when (and path (fs/exists? path))
         (cljs/analyze-file (str "file://" path)))))))

(defmethod core/handle "editor.eval.cljs" [{:keys [ns path code pos meta transport session] :as msg}]
    (let [ns (str ns)
          cur-ns (if (empty? ns) nil ns)
          cur-ns (or cur-ns (eval/file->ns path))
          cur-ns (symbol (or cur-ns 'cljs.user))
          extra-bindings {#'*ns* (eval/require|create-ns cur-ns)
                          #'cljs/*cljs-ns* cur-ns
                          #'*file* path
                          #'cljs/*cljs-file* path
                          #'*source-path* path}
          bindings (merge @session extra-bindings)]
  (try
      (with-bindings bindings
        (let [code (eval/prep-code msg)
              forms (eval/lined-read code)
              env {:context :expr :file path :locals {}}
              forms (if-not pos
                      forms
                      [(eval/find-form forms pos)])]
          (when pos
            (core/respond msg :editor.eval.cljs.location (clojure.core/meta (first forms))))
          (comp/with-core-cljs
           (if-not (first forms)
             (core/respond msg :editor.eval.cljs.no-op {})
             (core/respond msg :editor.eval.cljs.code {:results (doall (for [f forms]
                                                                         (eval-cljs env f)))
                                                       :ns cljs/*cljs-ns*
                                                       :meta (or meta {})})))))
   (catch Exception e
      (let [ex (ex-data e)]
        (core/respond msg :editor.eval.cljs.exception {:stack (exception/clean-trace e)
                                                       :meta {:end-line (:line ex)}}))))
    bindings))