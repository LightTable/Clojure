(defproject lein-light "0.1.0"
  :description "FIXME: write description"
  :url "http://github.com/kodowa/lein-light"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [leiningen "2.3.4"
                  :exclusions [stencil]]
                 [fs "1.3.3"]]
  :uberjar-name "lein-light-standalone.jar"
  :aot :all
  :source-paths ["src/"]
  :jvm-opts ["-Xmx1g"]
  :main leiningen.light-nrepl)
