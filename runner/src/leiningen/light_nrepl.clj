(ns leiningen.light-nrepl
  (:gen-class)
  (:require [leiningen.core.project :as lp]
            [leiningen.repl :as repl]
            [clojure.string :as string]
            [fs.core :as fs]))

(defn parse-version [ver]
  (assert (and ver (re-find #"^\d+\.\d+\.\d+" ver))
          (str "Invalid version number: " (pr-str ver) ". Must be in format X.X.X"))
  (let [[major minor patch] (string/split ver #"\.")
        [patch extra] (string/split patch #"-")]
    {:major (Integer. major)
     :minor (Integer. minor)
     :patch (Integer. patch)}))

(defn at-least-version? [ver min-version]
  (let [{:keys [major minor patch]} (parse-version ver)]
    (or (> major (:major min-version))
        (and (= major (:major min-version)) (> minor (:minor min-version)))
        (and (= major (:major min-version)) (= minor (:minor min-version)) (>= patch (:patch min-version))))))

(defn maintained-clojure-version?
  "Determine if Clojure version is supported for latest middleware.
  Return true for nil since there is no version and thus we are providing one"
  [ver]
  (if-not ver
    true
    ;; 1.7.0 candidates conflict with 1.7.0
    (and (not (.startsWith ver "1.7.0-"))
         (at-least-version? ver {:major 1 :minor 7 :patch 0}))))

(defn prep
  "Build a project map for the repl with LT middleware injected"
  [project name clj-version]
  (let [init `(swap! lighttable.nrepl.core/my-settings merge {:name ~(or name (str (:name project) " " (:version project))) :project (quote ~project)})
        init (if-let [cur-init (-> project :repl-options :init)]
               (list 'do cur-init init)
               init)
        lein-light-version (if (maintained-clojure-version? clj-version)
                             ;; Maintained lein-light-nrepl
                             "0.3.3"
                             ;; Deprecated/unmaintained lein-light-nrepl
                             "0.1.3")
        profile {:dependencies [['lein-light-nrepl/lein-light-nrepl lein-light-version]
                                ['lein-light-nrepl-instarepl "0.3.1"]]
                 :repl-options {:nrepl-middleware ['lighttable.nrepl.handler/lighttable-ops]
                                :init (with-meta init {:replace true})}}
        project (lp/merge-profiles project [profile])]
    (println "final project: " project)
    project))

(defn abort-unsupported-versions [clj-version cljs-version]
  (when (and clj-version (not (at-least-version? clj-version {:major 1 :minor 5 :patch 1})))
    (binding [*out* *err*]
      (println "Light Table requires Clojure Version 1.5.1 or higher")
      (System/exit 0)))
  (when (and cljs-version (at-least-version? cljs-version {:major 0 :minor 0 :patch 2341})
             (not (maintained-clojure-version? clj-version)))
    (binding [*out* *err*]
      (println "Light Table requires Clojure Version >= 1.7.0 for ClojureScript versions >= 0.0-2341")
      (System/exit 0))))

(defn find-dependency-version [proj dep]
  (let [deps (:dependencies proj)]
    (second (first (filter #(= (first %) dep) deps)))))

(defn light
  "Start a Light Table client for this project"
  [project name]
  (let [clj-version (find-dependency-version project 'org.clojure/clojure)
        cljs-version (some-> (find-dependency-version project 'org.clojure/clojurescript)
                             ;; Make 0.0- conform to standard patch versions
                             (string/replace "0.0-" "0.0."))]
    (abort-unsupported-versions clj-version cljs-version)
    (try
      (repl/repl (prep project name clj-version) ":headless")
      (catch Exception e
        (.printStackTrace e)
        (System/exit 1)))))

(defn -main [& [name]]
  (let [path (str (fs/absolute-path fs/*cwd*) "/project.clj")]
    (if (fs/exists? path)
      (light (lp/init-project (lp/read path)) name)
      (binding [*out* *err*]
        (println "Could not find project.clj file at: " path)))))
