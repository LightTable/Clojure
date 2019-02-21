(defproject lein-light "0.3.4"
  :description "Provide uberjar to start headless repl with LT middleware"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [leiningen "2.9.0" :exclusions [stencil]]
                 [fs "1.3.3"]]
  :uberjar-name "lein-light-standalone.jar"
  :profiles {:uberjar {:aot :all}}
  :source-paths ["src/"]
  :jvm-opts ["-Xmx1g"]
  :main leiningen.light-nrepl)
