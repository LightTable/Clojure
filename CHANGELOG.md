#Changes

##0.0.10

* FIX: disconnecting from a remote nrepl caused issues
* FIX: make instarepl command wasn't correctly checking tags
* UPDATE: ClojureScript 2173

##0.0.8

* UPDATE: Leiningen 2.3.4

##0.0.7

* FIX: auto-complete would sometimes break the instarepl
* ADDED: clojure.core and cljs.core to auto-complete by default

##0.0.6

* FIX: bug with external cljs dependencies and plugin building
* FIX: handle alternative exception types better
* UPDATE: lein-light-nrepl is now 0.0.14

##0.0.5

* FIX: handle custom eval in external browsers correctly.
* UPDATE: ClojureScript 2138

##0.0.4

* ADDED: source maps for plugins

##0.0.3

* ADDED: Make hints async to remove the weird slow downs on eval.

##0.0.2

* FIX: left out some behaviors needed for the remote nrepl connections
