(defproject lein-light "0.0.51"
  :description "FIXME: write description"
  :url "http://github.com/kodowa/lein-light"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [leiningen "2.3.4"
                  :exclusions [stencil]]
                 [fs "1.3.3"]
                 ]
  ;:exclusions [org.clojure/clojurescript]
  :uberjar-name "lein-light-standalone.jar"
  :aot :all
  :source-paths ["src/"
                ;"/users/chris/repos/clojurescript/src/clj"
               ;"/users/chris/repos/clojurescript/src/cljs"
                 ]
  :jvm-opts ["-Xmx1g"]
  :main leiningen.light-nrepl)
