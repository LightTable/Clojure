# lein-light-nrepl

lein-light-nrepl is the nrepl-based client for Light Table's clojure and clojurescript evaluation. Basically everything that requires the JVM will be found in this project.


## Building

Some dependencies have been inlined using [mranderson](https://github.com/benedekfazekas/mranderson). Hence building and working with the project
is a little more cumbersome. Please consult the readme for mranderson.


- `lein source-deps` Will do the work with inlining dependencies
- `lein with-profile plugin.mranderson/config install` will install the dependency inlined jar to your local repo
- `lein with-profile +plugin.mranderson/config deploy clojars` - for releasing a version to clojars
- `lein clean` if you add or remove dependencies


Note: When developing locally with mranderson, you'll need to modify source in `target/srcdeps`
