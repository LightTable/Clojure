#!/bin/sh
cd lein-light-nrepl
lein install
cd ../runner
lein uberjar
echo " --- Done!"
