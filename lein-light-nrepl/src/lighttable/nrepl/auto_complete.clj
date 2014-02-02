(ns lighttable.nrepl.auto-complete
  (:require [lighttable.nrepl.core :as core]
            [lighttable.nrepl.eval :as eval]
            [complete.core]))

(defn completion [string]
  {:completion string})

(defn completions [strings]
  (map completion (remove #(> (.indexOf % "__BEH__") -1) strings)))

(defn clj-hints-for-ns [ns]
  (completions
   (concat
    ;; special forms
    complete.core/special-forms
    ;; clojure.core
    (complete.core/ns-vars 'clojure.core)
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

(defn clj-hints [ns-name]
  (clj-hints-for-ns (symbol ns-name)))

(defn cljs-hints-for-ns [ns nss]
  (completions
   (concat
    ;; special forms
    complete.core/special-forms
    ;; cljs.core
    (for [def (-> nss (get 'cljs.core) :defs keys)]
      (str def))
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

(defn cljs-hints [ns-name]
  (let [nss (-> @lighttable.nrepl.cljs/compiler-env :cljs.analyzer/namespaces)]
    (cljs-hints-for-ns (symbol ns-name) nss)))

(defmethod core/handle "editor.clj.hints" [{:keys [session ns path] :as msg}]
  (let [ns (eval/normalize-ns ns path)]
    (core/respond msg "editor.clj.hints.result" (clj-hints ns) "json")
    @session))

(defmethod core/handle "editor.cljs.hints" [{:keys [session ns path] :as msg}]
  (let [ns (eval/normalize-ns ns path)]
    (core/respond msg "editor.clj.hints.result" (cljs-hints ns) "json")
    @session))
