find . -name '*.DS_Store' -type f -delete
cd runner
lein uberjar
lein install
rm -rf $LT_HOME/plugins/clojure/lein-light-standalone.jar
cp target/lein-light-standalone.jar $LT_HOME/plugins/clojure/lein-light-standalone.jar
cd ../lein-light-nrepl
lein install
echo " --- Done!"
