##Clojure for Light Table

The official Clojure(Script) language plugin for Light Table.

## Supported Clojure versions

This plugin requires projects Clojure 1.5.1 and higher. Starting with 0.2.0 this plugin will only be maintained for projects with Clojure 1.7.0 and higher.

## Supported ClojureScript versions

This plugin works for projects on recent versions of ClojureScript e.g. 1.7.X. For projects with ClojureScript versions 0.0-2341 and higher, Clojure 1.7.0 is required.

## Supported Java versions

This plugin requires Java 8 and higher. Java 7 has not been [officially supported since April 2015](http://www.oracle.com/technetwork/java/javase/downloads/eol-135779.html). While most plugin functionality works with Java 7, this may change as the plugin will target supported versions.

## Cljc eval

By default, \*.cljc files are identified as Clojure files. Thus when you eval, it will eval as a
Clojure file. If you'd like to eval as a ClojureScript file, run the command `Editor: Set current
editor syntax`, select `ClojureScript` and then eval.

## Clojure(script) error messages
Currently this plugin supports an experimental feature that allows to change the default exception behavior (showing the complete stacktrace) to an expandable version of the same. Some screenshots of the new behavior can be found [here](https://github.com/LightTable/Clojure/issues/77).
To use the new behavior go to ```User behaviors``` and add the following lines :

```Clojure
; for Clojure
[:editor.clj :-lt.plugins.clojure/clj-exception]
[:editor.clj :lt.plugins.clojure.collapsible-exception/clj-expandable-exception]

; for Clojurescript
[:editor.cljs :-lt.plugins.clojure/cljs-exception]
[:editor.cljs :lt.plugins.clojure.collapsible-exception/cljs-expandable-exception]
```

## First ClojureScript Repl

Welcome first time ClojureScript users! Please see [David Nolen's tutorial](https://github.com/swannodette/lt-cljs-tutorial) to get familiar with ClojureScript and comfortable with LightTable's repl. Note while doing that tutorial you were in a namespace. A namespace is necessary for a LightTable repl. Once you have finished the tutorial, create your own ClojureScript project with `lein new mies my-project` and eval there. If you want to add dependencies to your project, read the [below section](#clojurescript-eval) as that requires a different type of LightTable connection.

## ClojureScript Eval

There are 4 options to eval ClojureScript, 3 of which use your ClojureScript javascript. To add one of these connections, run the command `Connect: Add Connection`. The 3 connections to choose from:

1. `Light Table UI` - Connect to the LightTable js process. Great for a headless mode, writing plugins and to try out ClojureScript features. Note, you use the ClojureScript version that comes with LightTable.

2. `ClojureScript Browser` - Connect to a web page that has the compiled ClojureScript sourced e.g. `file:///path/to/index.html`. The internal browser is automatically opened to a web page based on configurable paths from behavior `:lt.plugins.clojure/set-cljs-browser-paths`. Recommended for ease of use.

3. `Browser` - Connect to a web page that has the compiled ClojureScript sourced e.g. `file:///path/to/index.html`. You must navigate the internal browser to that web page.

4. `Browser (External)` - Connect to a web page that has the compiled ClojureScript sourced e.g. `file:///path/to/index.html`. In addition to navigating the external browser, you must copy the script tag into that web page. Requires more setup than the internal browser but gives you the freedom to use any browser.

Note that for Browser options, compiled ClojureScript cannot be compiled with `:advanced` `:optimizations` mode.

## ClojureScript Workflows

Starting with 0.2.0, when you eval a cljs file, LT automatically chooses an appropriate cljs client for you based on the behavior `:lt.plugins.clojure/set-default-cljs-client`.
For ClojureScript projects, the `ClojureScript Browser` client opens an internal browser and attempts to find a valid url to connect to using possible paths from behavior `:lt.plugins.clojure/set-cljs-browser-paths`.
This means that before your first eval, your cljs assets _must_ already be compiled e.g. `lein cljsbuild once`. Make sure the namespace you're evaling is included in your compiled assets. For
example, if you're in a test namespace, your client browser _must_ be connected to an html file that includes test namespaces. In other words a test build of compiled assets must exist e.g. `lein cljsbuild once test` and an associated html file that sources in that compiled js.
For LightTable plugins, the `Light Table UI` client is started and eval should just work.

For ClojureScript projects:

Your project is connected to a browser. Recompile cljs outside of LT with project's cljs compile tool e.g. `lein cljsbuild auto`.
Most changes can be evaled. However, if adding project dependencies or requires to ns, use the `:client.refresh-connection` command
to refresh the browser page. To automate this on-save, add this to `user.behaviors`:

```clojurescript
:editor.clojurescript [(:lt.objs.editor.file/on-save :client.refresh-connection)]
```

For LightTable plugins:

Your project is connected to `LightTable UI`. When you save any plugin cljs file, compiled js is generated and saved. Any change
can be eval-ed.

## Connect to remote nREPL

When you eval a Clojure project, Light Table automatically starts an nREPL server and connects to it. If you'd prefer to start an nREPL server,
open the `Connections` panel, press `Add Connection` button and select the `Clojure (remote nREPL)` client. Make sure your project.clj
has the following `:dependencies` and `:repl-options`:

```clojure
(defproject lttest "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [lein-light-nrepl "X.X.X"]]
  :repl-options {:nrepl-middleware [lighttable.nrepl.handler/lighttable-ops]})
```

For projects using Clojure >= 1.5.1 and < 1.7.0, `X.X.X` refers to `0.1.3`, an older unmaintained version.
For projects using Clojure >= 1.7.0, `X.X.X` refers to the latest version of `lein-light-nrepl`:

[![Clojars Project](http://clojars.org/lein-light-nrepl/latest-version.svg)](http://clojars.org/lein-light-nrepl)

## Connection Troubleshooting

If your Clojure(Script) project fails to connect to LightTable, try these troubleshooting steps:

* If you have uberjar'ed your project, try deleting target/ or `lein clean` and reconnecting. See [this example issue](https://github.com/LightTable/LightTable/issues/1880)
* A Clojure connection [has the following dependencies](https://github.com/LightTable/Clojure/blob/8da0a05e998917d1d67d58c7bed9f95b6abad5c9/lein-light-nrepl/project.clj#L6-L13)
  that can conflict with your project's dependencies. If your project.clj has conflicting dependencies, try upgrading them to at least the same version Light Table has.
* Leiningen has a couple of ways of adding dependencies outside of project.clj. If you have a `~/.lein/profiles.clj` or a local `profiles.clj` try moving it out e.g. `mv ~/.lein/profiles.clj{,.bak}`. Also move out any local [checkouts/](https://github.com/technomancy/leiningen/blob/d40fdd4da363a21e9e2e469fd4418697e61c06b3/doc/TUTORIAL.md#checkout-dependencies).
* It's possible a dependency of a dependency can conflict. To see these conflicts run `lein deps :tree` in your project's root directory.
  Try resolving conflicts as suggested by output that starts with `Consider using these exclusions:`.
* If still unable to connect, make sure you've moved out Leiningen's dependency-altering files and file an issue with the full failure message, your project's project.clj and other standard [bug information](https://github.com/LightTable/LightTable/blob/master/CONTRIBUTING.md#bugs).

## License

Distributed under the MIT License, see license.md for the full text.

## For Committers

Plugin consists of the following components:

* `lein-light-nrepl/`: nREPL middleware that is released as a clojars library
* `runner/`: Uberjar that kicks off a connection to a Clojure(Script) project
* `build.sh`: Script that rebuilds uberjar with any changes made to lein-light-nrepl and runner. Any Clojure connections must be restarted for this change to take effect.
* `codemirror/clojure.js`: CodeMirror's clojure mode
  * [Current version](https://github.com/codemirror/CodeMirror/blob/724a0d32820fd28d145a1b8dae12f7bb813f925c/mode/clojure/clojure.js)
  * Upgrade `clojure.js` with the following where `$VERSION` is a version tag or commit SHA:

    curl https://raw.githubusercontent.com/codemirror/CodeMirror/$VERSION/mode/clojure/clojure.js > codemirror/clojure.js
* `src/`: Normal LightTable plugin

When releasing a new plugin version and lein-light-nrepl has changed:

* Bump lein-light-nrepl and lein-light in runner/.
* Update the uberjar with `lein uberjar` in `runner` to produce `runner/target/lein-light-standalone.jar`.
* Release the new version of lein-light-nrepl to [clojars](https://clojars.org/lein-light-nrepl)
