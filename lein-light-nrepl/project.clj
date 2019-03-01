(defproject lein-light-nrepl "0.3.4"
  :description "nrepl client for Light Table clj and cljs eval."
  :url "https://github.com/LightTable/Clojure/tree/master/lein-light-nrepl"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/tools.nrepl "0.2.13"]
                 [commons-io/commons-io "2.4"]
                 [org.clojure/tools.reader "1.3.2"]
                 [clj-stacktrace "0.2.8"]
                 [org.clojure/clojurescript "1.9.229"
                   :exclusions [org.apache.ant/ant]]
                 [clojure-complete "0.2.4"]]
  :jvm-opts ["-Xmx1g"])
