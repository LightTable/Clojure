(ns lighttable.nrepl.exception
  (:require [clojure.string :as string]
            [clj-stacktrace.repl :as exc]))

(def reader-trace #"(?s)\s*(core.clj:4227 clojure.core/ex-info)?\s*reader_types.clj:219.*")
(def eval-trace #"(?s)\s*Compiler.java:6619.*")
(def analyzer-trace #"(?s)\s*Compiler.java:[\d]+ clojure.lang.Compiler.analyze.*")

(defn clean-trace [e]
  (-> (exc/pst-str e)
      (string/replace eval-trace "")
      (string/replace reader-trace "")
      (string/replace analyzer-trace "")
      ))
