(ns lighttable.nrepl.auto-complete
  (:require [lighttable.nrepl.core :as core]
            [complete.core]))

(defn completion [string]
  {:completion string})

(defn completions [strings]
  (map completion strings))

(defn clj-hints-for-ns [ns]
  (completions
   (concat
    ;; special forms
    complete.core/special-forms
    ;; local vars
    (complete.core/ns-vars ns)
    ;; local classes
    (complete.core/ns-classes ns)
    ;; local java methods
    (complete.core/ns-java-methods ns)
    ;; aliased namespaces
    (for [[alias required-ns] (ns-aliases ns)]
      (str alias))
    ;; aliased vars
    (for [[alias required-ns] (ns-aliases ns)
          var (complete.core/ns-public-vars required-ns)]
      (str alias "/" var)))))

(defn clj-hints-global []
  (completions
   (concat
    ;; global namespaces
    (for [required-ns (all-ns)]
      (str required-ns))
    ;; global vars
    (for [required-ns (all-ns)
          var (complete.core/ns-public-vars required-ns)]
      (str required-ns "/" var))
    ;; global classes
    ;; TODO completing these is very slow
    ;; (deref complete.core/top-level-classes 0 nil)
    ;; (deref complete.core/nested-classes 0 nil)
    ;; TODO static methods
    )))

(defn clj-hints []
  (assoc
    (into {} (for [ns (all-ns)]
               [(str ns) (clj-hints-for-ns ns)]))
    "" (clj-hints-global)))

(defn cljs-hints-for-ns [ns nss]
  (completions
   (concat
    ;; special forms
    complete.core/special-forms
    ;; local vars
    ;; TODO filter private defs
    (for [def (-> nss (get ns) :defs keys)]
      (str def))
    (for [def (-> nss (get ns) :uses keys)]
      (str def))
    ;; aliased namespaces
    (for [[alias aliased-ns] (-> nss (get ns) :requires)
          :when (not= alias aliased-ns)]
      (str alias))
    ;; aliased vars
    (for [[alias aliased-ns] (-> nss (get ns) :requires)
          :when (not= alias aliased-ns)
          def (-> nss (get aliased-ns) :defs keys)]
      (str alias "/" def)))))

(defn cljs-hints-global [nss]
  (completions
   (concat
    ;; global namespaces
    (for [global-ns (-> nss keys)]
      (str global-ns))
    ;; global vars
    (for [[global-ns val] nss
          def (-> val :defs keys)]
      (str global-ns "/" def)))))

(defn cljs-hints []
  (let [nss (-> @lighttable.nrepl.cljs/compiler-env :cljs.analyzer/namespaces)]
    (assoc
      (into {} (for [ns (keys nss)]
               [(str ns) (cljs-hints-for-ns ns nss)]))
      "" (cljs-hints-global nss))))

(defn hints []
  {"clj" (clj-hints)
   "cljs" (cljs-hints)})

(defmethod core/handle "editor.clj.hints" [{:keys [session] :as msg}]
  (core/respond msg "editor.clj.hints.result" (hints) "json")
  @session)
