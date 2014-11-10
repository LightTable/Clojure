##Clojure for Light Table

The official Clojure language plugin for Light Table.

## First ClojureScript Repl

Welcome first time ClojureScript users! Please see [David Nolen's tutorial](https://github.com/swannodette/lt-cljs-tutorial) to get familiar with ClojureScript and comfortable with LightTable's repl. Note while doing that tutorial you were in a namespace. A namespace is necessary for a LightTable repl. Once you have finished the tutorial, create your own ClojureScript project with `lein new mies my-project` and eval there. If you want to add dependencies to your project, read the [below section](#clojurescript-eval) as that requires a different type of LightTable connection.

## ClojureScript Eval

There are 3 ways to eval ClojureScript, 2 of which use your ClojureScript javascript. To add one of these connections, run the command `Connect: Add Connection`. The 3 connections to choose from:

1. `Light Table UI` - Connect to the LightTable js process. Great for a headless mode, writing plugins and to try out ClojureScript features. Note, you use the ClojureScript version that comes with LightTable.

2. `Browser` - Connect to a web page that has the compiled ClojureScript sourced e.g. `file:///path/to/index.html`. You must navigate the internal browser to that web page. Recommended for ease of use.

3. `Browser (External)` - Connect to a web page that has the compiled ClojureScript sourced e.g. `file:///path/to/index.html`. In addition to navigating the external browser, you must copy the script tag into that web page. Requires more setup than the internal browser but gives you the freedom to use any browser.

## For Commiters

* When releasing a new plugin version and lein-light-nrepl has changed:
  * Bump lein-light-nrepl and lein-light in runner/.
  * Update the uberjar with `lein uberjar` in `runner/target/lein-light-standalone.jar`.
  * Release the new version of lein-light-nrepl to [clojars](https://clojars.org/lein-light-nrepl)
* No process for upgrading `clojure-mode.js` until [this issue](https://github.com/LightTable/Clojure/issues/26) is addressed.

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

## License

Distributed under the MIT License, see license.md for the full text.
