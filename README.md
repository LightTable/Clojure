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



Apache License
                           Version 2.0, January 2004
                        https://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright 2019 Rolando Gopez Lacuata

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       https://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

