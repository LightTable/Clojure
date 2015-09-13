##Clojure for Light Table

The official Clojure language plugin for Light Table.

## Supported Clojure versions

This plugin requires projects Clojure 1.5.1 and higher. Starting with 0.2.0 this plugin will only be maintained for projects with Clojure 1.7.0 and higher.

## Supported ClojureScript versions

This plugin works for projects on recent versions of ClojureScript e.g. 1.7.X. For projects with ClojureScript versions 0.0-2341 and higher, Clojure 1.7.0 is required.

## First ClojureScript Repl

Welcome first time ClojureScript users! Please see [David Nolen's tutorial](https://github.com/swannodette/lt-cljs-tutorial) to get familiar with ClojureScript and comfortable with LightTable's repl. Note while doing that tutorial you were in a namespace. A namespace is necessary for a LightTable repl. Once you have finished the tutorial, create your own ClojureScript project with `lein new mies my-project` and eval there. If you want to add dependencies to your project, read the [below section](#clojurescript-eval) as that requires a different type of LightTable connection.

## ClojureScript Eval

There are 3 ways to eval ClojureScript, 2 of which use your ClojureScript javascript. To add one of these connections, run the command `Connect: Add Connection`. The 3 connections to choose from:

1. `Light Table UI` - Connect to the LightTable js process. Great for a headless mode, writing plugins and to try out ClojureScript features. Note, you use the ClojureScript version that comes with LightTable.

2. `Browser` - Connect to a web page that has the compiled ClojureScript sourced e.g. `file:///path/to/index.html`. You must navigate the internal browser to that web page. Recommended for ease of use.

3. `Browser (External)` - Connect to a web page that has the compiled ClojureScript sourced e.g. `file:///path/to/index.html`. In addition to navigating the external browser, you must copy the script tag into that web page. Requires more setup than the internal browser but gives you the freedom to use any browser.

## ClojureScript Workflows

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
  :description "FIXME: write description"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [lein-light-nrepl "X.X.X"]]
  :repl-options {:nrepl-middleware [lighttable.nrepl.handler/lighttable-ops]})
```

For projects using Clojure >= 1.5.1 and < 1.7.0, `X.X.X` refers to `0.1.3`, an older unmaintained version.
For projects using Clojure >= 1.7.0, `X.X.X` refers to the latest version of `lein-light-nrepl`:

[![Clojars Project](http://clojars.org/lein-light-nrepl/latest-version.svg)](http://clojars.org/lein-light-nrepl)

## License

Distributed under the MIT License, see license.md for the full text.

## For Committers

* Project layout
  * runner/: Contains uberjar to inject our nREPL middleware into a project and then start a repl
  * lein-light-nrepl/: Contains nREPL middleware that needs to be deployed to Clojars when changed
  * src/ and everything else: Normal LightTable plugin
* When releasing a new plugin version and lein-light-nrepl has changed:
  * Bump lein-light-nrepl and lein-light in runner/.
  * Update the uberjar with `lein uberjar` in `runner` to produce `runner/target/lein-light-standalone.jar`.
  * Release the new version of lein-light-nrepl to [clojars](https://clojars.org/lein-light-nrepl)
* No process for upgrading `clojure-mode.js` until [this issue](https://github.com/LightTable/Clojure/issues/26) is addressed.
