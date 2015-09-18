#!/bin/sh
cd runner
lein uberjar
cd ../lein-light-nrepl
lein install
echo " --- Done!"
