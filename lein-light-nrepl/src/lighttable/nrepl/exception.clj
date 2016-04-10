(ns lighttable.nrepl.exception
  (:require [clojure.string :as string]
            [io.aviso.exception :as aviso]))

;; (def reader-trace #"(?s)\s*(core.clj:4227 clojure.core/ex-info)?\s*reader_types.clj:219.*")
;; (def eval-trace #"(?s)\s*Compiler.java:6619.*")
;; (def analyzer-trace #"(?s)\s*Compiler.java:[\d]+ clojure.lang.Compiler.analyze.*")
;; (def cljs-eval #"(?s)\scljs.clj:[\d]+ lighttable.nrepl.cljs/eval-cljs.*")

(def clean-trace aviso/format-exception)
