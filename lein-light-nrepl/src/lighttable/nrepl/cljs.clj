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
            [cljs.env :as cljs-env :refer [with-compiler-env]]
            [clojure.test :as test]
            [cljs.closure :as cljsc]
            [clojure.java.io :as io]
            [cljs.tagged-literals :as tags]
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


(def compiler-env (cljs-env/default-compiler-env))
(def build-env (atom {}))

(defn ns->cljs-file [s]
  (str (string/replace (munge (str s)) \. \/) ".cljs"))

(defn file|resource->file [file]
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

(defn source-map-ref []
  (if-let [c (resolve 'cljs.compiler/*source-map-data*)]
    (@@c :source-map)
    @(resolve 'comp/*cljs-source-map*)))

(defn gen-line []
  (if-let [c (resolve 'cljs.compiler/*source-map-data*)]
    (@@c :gen-line)
    @(resolve 'comp/*cljs-gen-line*)))

(defn offset-source-map [map offset]
  (into map
        (for [[line col-map] map]
          [line (into col-map
                      (for [[col items] col-map]
                        [col (mapv #(update-in % [:gline] + offset) items)]))])))

(defmacro with-cljs-env [cur & body]
  `(let [file# (:file ~cur)
         cur-ns# (or (-> ~cur :ns :name) 'cljs.user)
         source-map-bindings# (if (resolve 'cljs.compiler/*source-map-data*)
                                {(resolve 'cljs.compiler/*source-map-data*) (atom {:source-map (sorted-map)
                                                                 :gen-col 0
                                                                 :gen-line 0})}
                                {(resolve 'cljs.compiler/*cljs-source-map*) (atom (sorted-map))
                                 (resolve 'cljs.compiler/*cljs-gen-col*) (atom 0)
                                 (resolve 'cljs.compiler/*cljs-gen-line*) (atom 0)}
                                )
         bindings# (merge source-map-bindings#
                          {#'*ns* (eval/require|create-ns cur-ns#)
                           #'reader/*data-readers* tags/*cljs-data-readers*
                           #'cljs/*cljs-ns* cur-ns#
                           #'*file* file#
                           #'cljs/*cljs-file* file#
                           #'*source-path* file#})]
     (with-bindings bindings#
       (with-compiler-env compiler-env
         (cljs.compiler/with-core-cljs
          ~@body)))))

(defn with-forms [{:keys [file] :as cur}]
  (let [file (file|resource->file file)]
    (when file
      (let [file-loc (str file)
            mtime (when (fs/exists? file-loc) (fs/mod-time (io/as-file file)))]
        (with-cljs-env cur
          (assoc cur
            :file file-loc
            :forms (eval/lined-read (slurp file))
            :mtime mtime))))))

(defn analyze [env form]
  (let [ast (cljs/analyze (assoc env :ns (or (cljs/get-namespace cljs/*cljs-ns*) {})) form)]
    (set! *ns* (create-ns cljs/*cljs-ns*))
    ast))

(defn with-analysis [{:keys [forms file] :as cur}]
  (when forms
    (with-cljs-env cur
      (let [env (assoc (cljs/empty-env) :file file)]
        (let [results (mapv (partial analyze env) forms)
              ns (or (cljs/get-namespace cljs/*cljs-ns*) {})]
          (assoc cur
            :analysis results
            :name (-> ns :name)
            :ns (select-keys ns cljs-ns-keys)
            :deps (set/union (-> (:requires ns) vals set)
                             (-> (:uses ns) vals set)
                             (when-not (= (-> ns :name) 'cljs.core)
                               #{'cljs.core}))))))))

(defn with-js [{:keys [analysis file dir] :as cur}]
  (when analysis
    (with-cljs-env cur
      (let [js (reduce str (map comp/emit-str analysis))
            js (str "if(!lt.util.load.provided_QMARK_('" (:name cur) "')) {\n" js "}\n")
            sm-ref (offset-source-map (source-map-ref) 1)
            rel-path (subs file (inc (count dir)) (count file))
            sm (sm/encode {file sm-ref}
                         {:lines (+ 2 (gen-line))
                          :file  (str (or file (:name cur)) ".map")
                          :relpaths {file rel-path}
                          :output-dir dir
                          :source-map-path dir
                          })]
        (assoc cur
          :js js
          ;; we add an extra line at the end, and wrap it in an if provided check
          :lines (+ 2 (gen-line))
          :source-map-internal sm-ref
          :source-map sm)))))

(defn cljs-dep [{:keys [ns file]}]
  (when-let [dep (-> {:file (or file (ns->cljs-file ns))}
                     (with-forms)
                     (with-analysis)
                     (with-js))]
    {(-> dep :name) dep}))

(defn js-dep [{:keys [ns]}]
  (when-let [dep (get (cljsc/js-dependency-index {}) (str ns))]
    (let [deps (:requires dep)
          deps (if (not= ns 'goog)
                 (conj deps 'goog)
                 deps)
          content (slurp (io/resource (:file dep)))
          content (str "if(!lt.util.load.provided_QMARK_('" (str ns) "')) {\n" content "}\n")]
      (into {ns {:js content
                      :lines (count (string/split content #"\n"))
                      :name ns
                      :deps (map symbol deps)}}
            (map #(vector (symbol %) ns) (remove #{(str ns)} (:provides dep)))))))

(defn dep->deps [dep]
  (set (mapcat #(-> % second :deps) dep)))

(defn transitive [dep {:keys [seen available dir] :as cur}]
  (loop [all dep
         left (set/difference (dep->deps dep) seen)
         seen seen]
    (if-not (seq left)
      all
      (let [cur-ns (first left)
            dep (if-let [avail (get available cur-ns)]
                  {cur-ns avail}
                  (or (js-dep {:ns cur-ns
                               :dir dir})
                      (cljs-dep {:ns cur-ns
                                 :dir dir})))
            [seen all] (if-not dep
                         [(conj seen cur-ns) all]
                         [(apply conj seen cur-ns (keys dep)) (merge all dep)])
            left (set/difference (into left (dep->deps dep)) seen)]
        (recur all left seen)
        ))))

(defn transitive-all [{:keys [ignore nss files dir available]}]
  (let [type (if nss
               :ns
               :file)
        ignore (set ignore)
        up-to-date? (into {} (map (juxt :file :name) (vals available)))]
    (reduce (fn [final cur-file]
              (let [transitive-opts {:seen (into ignore (set (keys final)))
                                     :available available
                                     :dir dir}]
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
       (filterv map?)))

(defn ordered-js [deps]
  (reduce (fn [final cur]
            (str final (:js cur)))
          ""
          deps))


(defn concat-source-maps [ordered dir]
  (let [concated (reduce (fn [final cur]
                             (assoc final
                               :lines (+ (:lines final) (:lines cur))
                               :combined (if-not (:source-map-internal cur)
                                           (:combined final)
                                           (merge (:combined final) {(:file cur) (offset-source-map (:source-map-internal cur) (:lines final))}))))
                         {:lines 0
                          :combined {}}
                         (filter :lines ordered))
        remove-dir-pattern (re-pattern (-> (string/replace dir #"\\" "/")
                                           (str "/")))]
    {:source-map (-> (sm/encode (:combined concated)
                                {:lines (:lines concated)
                                 :file  (str dir "/compiled.map")
                                 :relpaths (into {} (map #(do [(:file %) (subs (:file %) (inc (count dir)) (count (:file %)))])
                                                         (filter :file ordered)))
                                 :output-dir dir
                                 :source-map-path dir})
                     (string/replace remove-dir-pattern ""))
     :lines (:lines concated)
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
     :dir (:dir to-compile)
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

(defn with-merged-js [{:keys [ordered dir] :as cur}]
  (when ordered
    (merge cur
           (concat-source-maps ordered dir)
           {:js (ordered-js ordered)})))

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

(defmethod core/handle "cljs.compile" [{:keys [ignore dir files nss merged? cljsbuild? session] :as msg}]
  (with-compiler-env compiler-env
    (let [compiled  (-> (compile-all {:ignore (or ignore [])
                                      :nss nss
                                      :files files
                                      :dir dir
                                      :available (remove-modified @build-env)})
                        (with-provides)
                        (with-ordered-deps)
                        (with-merged-js))
          final (if merged?
                  (select-keys compiled [:provides :missing :cycles :js :source-map :lines])
                  (-> (select-keys compiled [:provides :missing :cycles :js :source-map :lines])
                      (assoc :ordered (mapv #(select-keys % [:name :js :source-map :lines]) (:ordered compiled)))))]
      (reset! build-env (:namespaces compiled))
      (core/respond msg :cljs.compile.results final)
      @session)))

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
  (let [stored-ns (cljs/get-namespace cljs/*cljs-ns*)
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
                 (comp/emit-str (cljs/analyze (assoc env :ns (or (cljs/get-namespace cljs/*cljs-ns*) {})) f)))))}))

(defn init-cljs [ns path]
  (when-not (cljs/get-namespace ns)
    (with-compiler-env compiler-env
      (binding [cljs/*cljs-ns* 'cljs.user]
        (comp/with-core-cljs
         (cljs/analyze {:context :expr :ns {} :locals {}} (list 'ns ns))
         (when (and path (fs/exists? path))
           (cljs/analyze-file (str "file://" path))))))))

(defmethod core/handle "editor.eval.cljs" [{:keys [ns path code pos meta transport session] :as msg}]
    (let [ns (str ns)
          cur-ns (if (empty? ns) nil ns)
          cur-ns (or cur-ns (eval/file->ns path))
          cur-ns (symbol (or cur-ns 'cljs.user))
          extra-bindings {#'*ns* (eval/require|create-ns cur-ns)
                          #'cljs/*cljs-ns* cur-ns
                          #'*file* path
                          #'reader/*data-readers* tags/*cljs-data-readers*
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
          (with-compiler-env compiler-env
            (comp/with-core-cljs
             (if-not (first forms)
               (core/respond msg :editor.eval.cljs.no-op {})
               (core/respond msg :editor.eval.cljs.code {:results (doall (for [f forms]
                                                                           (eval-cljs env f)))
                                                         :ns cljs/*cljs-ns*
                                                         :meta (or meta {})}))))))
   (catch Exception e
      (let [ex (ex-data e)]
        (core/respond msg :editor.eval.cljs.exception {:stack (exception/clean-trace e)
                                                       :meta {:end-line (:line ex)}}))))
    bindings))
