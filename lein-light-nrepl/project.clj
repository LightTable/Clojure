(defproject lein-light-nrepl "0.0.8"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/tools.nrepl "0.2.3"]
                 [commons-io/commons-io "2.4"]
                 [ibdknox/tools.reader "0.8.0"]
                 [ibdknox/analyzer "0.0.2"]
                 [clj-stacktrace "0.2.7"]
                 [fs "1.3.3"]
                 [org.clojure/clojurescript "0.0-2030"
                   :exclusions [org.apache.ant/ant
                                org.clojure/tools.reader]]
                 ]
  :jvm-opts ["-Xmx1g"])
