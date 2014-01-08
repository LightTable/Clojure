#!/bin/sh
find . -name '*.DS_Store' -type f -delete
cd runner
lein uberjar
lein install
cd ../lein-light-nrepl
lein install
echo " --- Done!"
