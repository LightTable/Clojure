(ns lighttable.nrepl.fs
  "Minimal implementation of fs 1.3.3"
  (:require [clojure.java.io :as io]))

(defn exists? [path]
  (.exists (io/file path)))

(defn absolute-path [path]
  (.getAbsolutePath (io/file path)))

(defn mod-time [path]
  (.lastModified (io/file path)))

(def cwd (.getCanonicalFile (io/file ".")))
