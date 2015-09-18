(ns leiningen.light-nrepl-test
  (:require [leiningen.light-nrepl :as repl]
            [clojure.test :refer [is deftest testing]]))

(deftest at-least-version-test
  (testing "Smaller versions return false"
    (is (false? (repl/at-least-version? "1.4.1" {:major 1 :minor 5 :patch 1})))
    (is (false? (repl/at-least-version? "0.7.5" {:major 1 :minor 5 :patch 1}))))
  (testing "Larger or equal to versions return true"
    (is (repl/at-least-version? "1.6.1" {:major 1 :minor 6 :patch 1}))
    (is (repl/at-least-version? "1.8.0" {:major 1 :minor 6 :patch 1}))
    (is (repl/at-least-version? "2.1.0" {:major 1 :minor 6 :patch 1}))))

(deftest maintained-clojure-version-test
  (is (repl/maintained-clojure-version? "1.8.0-alpha4"))
  (is (repl/maintained-clojure-version? nil)
      "nil is maintained since the user is given the clojure version of the middleware")
  (is (false? (repl/maintained-clojure-version? "1.7.0-RC1"))
      "1.7.0-* versions aren't maintained because they conflict with the new middleware"))

(deftest parse-version-test
  (testing "Extra versioning after patch is ignored"
    (is (= {:major 1 :minor 7 :patch 0} (repl/parse-version "1.7.0-RC1"))))
  (testing "Fail fast if nil version"
    (is (thrown? AssertionError (repl/parse-version nil))))
  (testing "Fail fast if invalid version format"
    (is (thrown? AssertionError (repl/parse-version "1.1")))))
