# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/).

## [6.0.0] - 2022-10-25
### Added
- nodejs v12, v19 test runs
- eslint redos plugin
- ls-engines (tests dependency graph for engine compatibility)
- Renovate bot config

### Updated
- actions/checkout@v3
- actions/setup-node@v3
- github/codeql-action/init@v2
- github/codeql-action/autobuild@v2
- github/codeql-action/analyze@v2
- Minimum supported NodeJS version is now 12.17
- @snyk/protect@1.1020.0
- glob@8.0.3
- @types/chai@4.3.3
- @types/checkstyle-formatter@1.0.0
- @types/deep-equal@1.0.1
- @types/glob@8.0.0
- @types/minimist@1.2.2
- @types/mocha@10.0.0
- chai@4.3.6
- eslint@8.26.0
- eslint-config-xo@0.42.0
- eslint-plugin-import@2.26.0
- mocha@10.1.0
- npm-run-all@4.1.5
- nyc@15.1.0
- prettier@2.7.1

### Removed
- Breaking: NodeJS support <12.17
- nodejs v17 test run

## [5.0.2] - 2022-03-25
### Added
- nodejs v18 test run

### Updated
- @types/chai@4.3.1
- glob@8.0.1

### Removed
- nodejs v12 test run (but should still work)

## [5.0.1] - 2022-03-25
### Added
- node_js 17 support
- eslint
- @snyk/protect
- @types/chai
- @types/checkstyle-formatter
- @types/deep-equal
- @types/glob
- @types/minimist
- @types/mocha

### Updated
- Link to CHANGELOG now correctly references the `main` tree
- Some code style revisions to match xo, then eslint style rules
- chalk@5.0.1
- chai@4.3.4
- crlf@1.1.1
- deep-equal@2.0.5
- eslint-config-xo@0.40.0
- eslint-plugin-import@2.25.4
- eslint@8.10.0
- glob@7.2.0
- log-symbols@5.1.0
- minimist@1.2.6
- mocha@9.1.3
- prettier@2.6.1

### Removed
- xo
- snyk

## [5.0.0] - 2021-04-22
### Added
- node_js 16 support
- dependabot and codeql scanning
- Github build badge

### Updated
- BREAKING CHANGE - this is now an ES Module, and now requires node_js 12 or above
- chalk@4.1.1
- log-symbols@5.0.0
- snyk@1.563.0
- mocha@8.3.2
- prettier@2.2.0
- xo@0.39.1

### Removed
- node_js 10, 13 support
- david-dm badges
- TravisCI build badge

## [4.6.0] - 2022-10-25
### Added
- NodsJS 19.x test run

### Updated
- Minimum supported NodeJS version is now 12.x
- @snyk/protect@1.1041.0
- glob@8.0.3
- minimist@1.2.7
- @types/chai@4.3.3
- @types/glob@8.0.0
- @types/mocha@10.0.0
- eslint@8.26.0
- eslint-config-xo@0.42.0
- ls-engines@0.7.0
- mocha@10.1.0
- prettier@2.7.1

### Removed
- NodeJS v10.x support

## [4.5.0] - 2022-05-03
### Added
- dependabot
- codeql analysis
- NodeJS 16.x, 18.x test runs
- @snyk/protect
- @types/chai
- @types/checkstyle-formatter
- @types/deep-equal
- @types/glob
- @types/mocha
- eslint
- eslint-config-xo
- eslint-plugin-import
- ls-engines

### Updated
- https Semver link
- bin/{cfpathcheck -> cli/js}
- {test -> fixtures}/test-template.cfm
- Various eslint code style issues fixed
- chai@4.3.6
- deep-equal@2.0.5
- minimist@1.2.6
- mocha@10.0.0
- prettier@2.6.2

### Removed
- TravisCI setup
- DavidDM badges
- NodeJS 10.x, 13.x, 15.x test runs
- snyk
- xo

## [4.4.0] - 2020-10-20
### Added
- node_js 15 support
- xo badge

### Updated
- cfpathcheck.formatter(): use a ternary
- deep-equal@2.0.4
- mocha@8.2.0
- prettier@2.1.2
- snyk@1.419.0
- xo@0.34.1

## [4.3.0] - 2020-08-13
### Added
- deepEqual (used instead of lodash.isEqual)
- Linting of test scripts, with annotations to squish some warnings
- Further .snyk policy changes to ignore certain vulns

### Updated
- mocha@8.1.1
- snyk@1.373.1
- xo@0.33.0

### Removed
- lodash

## [4.2.0] - 2020-07-05
### Added
- travis-ci.com for test and build

### Updated
- snyk policy for dependency vulnerabilities
- chalk@4.1.0
- mocha@8.0.1
- nyc@15.1.0
- snyk@1.360.0
- xo@0.32.1

### Removed
- Unused catch argument
- travis-ci.org test/build

## [4.1.0] - 2020-04-30
### Added
- node_js v14 support
- Github workflow for running tests

### Updated
- Modified lib/{cfpathcheck,utils}.js to conform to updated xo linting rules
- chalk@4.0.0
- log-symbols@4.0.0
- minimist@1.2.5
- mocha@7.1.2
- nyc@15.0.1
- prettier@2.0.5
- snyk@1.315.1
- xo@0.30.0

### Removed
- Greenkeeper badge (retired)

## [4.0.0] - 2020-02-23
### Added
- npm-run-all for parallel test task running

### Updated
- mocha@7.0.1
- nyc@15.0.0
- snyk@1.296.0
- xo@0.26.1

### Removed
- node_js 8 and 9 support

## [3.1.0] - 2019-12-14
### Added
- xo linter
- prettierrc.yaml config
- nodejs v13 support
- unit tests (using mocha and chai)

### Updated
- chalk@3.0.0
- glob@7.1.6
- prettier@1.19.1
- snyk@1.260.0

### Removed
- eslint

## [3.0.6] - 2019-10-13
### Updated
- snyk@1.234.2
- eslint@6.5.1
- eslint-config-prettier@6.4.0
- eslint-plugin-jsdoc@15.11.0
- eslint-plugin-prettier@3.1.1

## [3.0.5] - 2019-09-16
### Added
- Greenkeeper.io badge

### Updated
- lodash@4.17.15
- snyk@1.226.0
- eslint@6.3.0
- eslint-config-prettier@6.2.0
- eslint-plugin-jsdoc@15.9.1
- eslint-plugin-node@10.0.0

### Removed
- Verbalize (has security vulnerabilities in its own dependendencies & is unmaintained)
- pathIsAbsolute (unneeded as node 0.12 is no longer supported)

## [3.0.4] - 2019-07-10
### Added
- snyk protect

### Updated
- eslint@6.0.1
- eslint-config-prettier@6.0.0
- eslint-plugin-jsdoc@15.2.0
- lodash@4.17.13
- prettier@1.18.2
- snyk@1.192.5

## [3.0.3] - 2019-05-26
### Updated
- eslint-plugin-node@9.1.0
- snyk@1.167.2

## [3.0.2] - 2019-05-24
### Updated
- Update package.engines to node >=8

## [3.0.1] - 2019-05-24
### Updated
- Bumped patch version after failed publish to npmjs.com

## [3.0.0] - 2019-05-24
### Added
- node_js 12 support in .travis.yml
- Snyk badge

## Updated
- glob@7.1.4
- log-symbols@3.0.0
- eslint@5.16.0
- eslint-config-prettier@4.3.0
- eslint-plugin-jsdoc@7.0.2
- eslint-plugin-prettier@3.1.0
- prettier@1.17.1
- snyk@1.166.1

## Removed
- node_js 6 and 7 support

## [2.0.1] - 2019-02-05
### Added
- node_js 11 support in .travis.yml
- Snyk security monitoring
- Sonatype DepShield

### Removed
- grunt
- grunt-release-it
- load-grunt-tasks
- verb

### Updated
- Some refactoring
- eslint@5.13.0
- eslint-config-prettier@4.0.0
- eslint-plugin-jsdoc@4.1.0
- eslint-plugin-node@8.0.1
- eslint-plugin-prettier@3.0.1
- prettier@1.16.4


## [2.0.0] - 2018-07-16
### Added
- node_js 10 support in .travis.yml
- eslint (& accompanying npm script)
- some es6 syntax features (arrow functions, const & let etc.)

### Removed
- node_js 4 & 5 support. node_js 6 is now the minimum supported version
- grunt-eslint

### Updated
- chalk@2.4.1
- lodash@4.17.10
- log-symbols@2.2.0
- eslint@5.1.0
- eslint-config-prettier@2.9.0
- eslint-plugin-jsdoc@3.7.1
- eslint-plugin-node@6.0.1
- eslint-plugin-prettier@2.6.2
- grunt@1.0.3
- load-grunt-tasks@4.0.0
- prettier@1.13.7

## [1.5.0] - 2017-11-21
### Added
- node_js 9 support in .travis.yml

### Updated
- chalk@2.3.0
- log-symbols@2.1.0
- eslint@4.11.0
- eslint-config-prettier@2.8.0
- eslint-plugin-jsdoc@3.2.0
- eslint-plugin-node@5.2.1
- prettier@1.8.2

## [1.4.0] - 2017-09-21
### Added
- prettier (eslint ruleset & formatting applied)

### Updated
- checkstyle-formatter@1.1.0
- eslint@4.7.1
- eslint-config-prettier@2.5.0
- eslint-plugin-prettier@2.3.1
- grunt-eslint@20.1.0
- prettier@1.7.0

## [1.3.0] - 2017-08-07
### Updated
- Regex tweaked for namespaceSearch (removed unnecessary escaping)
- .eslintrc -> .eslintrc.yml
- chalk@2.1.0
- glob@7.1.2
- lodash@4.17.4
- log-symbols@2.0.0
- eslint-plugin-jsdoc@3.1.2
- eslint-plugin-node@5.1.1
- grunt-eslint@20.0.0

### Added
- .editorconfig
- eslint as devDependency
- node v8 support in .travis.yml

## [1.2.1] - 2016-11-05
### Updated
- glob@7.1.1
- lodash@4.16.6
- path-is-absolute@1.0.1
- eslint-plugin-node@3.0.3

### Added
- node v7 support in .travis.yml

## [1.2.0] - 2016-10-03
### Added
- Support for single quotes delimiting `<cfimport>` and `<cfinclude>` attributes.

## [1.1.1] - 2016-08-19
### Updated
- Dynamic paths built with concatenation now supported, and the path winds back to the last slash to find the directory

## [1.1.0] - 2016-08-17
### Added
- Support for `include` statements in `<cfscript>` tags.


## [1.0.0] - 2016-08-17
### Added
- CHANGELOG.md (this file).
- Code Climate badges.
- Some JSDoc annotations.

### Removed
- Node 0.10 support has been removed. cfpathcheck now needs at least node v4.

### Changed
- Finalise the eslint setup

## [0.7.1] - 2016-04-04
### Added
- TravisCI build badge.

## [0.7.0] - 2016-04-04
### Added
- Gruntfile for running tasks

### Changed
- Use new Verbalize API

### Removed
- Node 0.8 support.

## [0.6.1] - 2016-04-04
### Added

- grunt for task running.
- grunt-release for releasing tagged versions.

[6.0.0]: https://github.com/timbeadle/cfpathcheck/compare/5.0.2...6.0.0
[5.0.2]: https://github.com/timbeadle/cfpathcheck/compare/5.0.1...5.0.2
[5.0.1]: https://github.com/timbeadle/cfpathcheck/compare/5.0.0...5.0.1
[5.0.0]: https://github.com/timbeadle/cfpathcheck/compare/4.4.0...5.0.0
[4.6.0]: https://github.com/timbeadle/cfpathcheck/compare/4.5.0...4.6.0
[4.5.0]: https://github.com/timbeadle/cfpathcheck/compare/4.4.0...4.5.0
[4.4.0]: https://github.com/timbeadle/cfpathcheck/compare/4.3.0...4.4.0
[4.3.0]: https://github.com/timbeadle/cfpathcheck/compare/4.2.0...4.3.0
[4.2.0]: https://github.com/timbeadle/cfpathcheck/compare/4.1.0...4.2.0
[4.1.0]: https://github.com/timbeadle/cfpathcheck/compare/4.0.0...4.1.0
[4.0.0]: https://github.com/timbeadle/cfpathcheck/compare/3.1.0...4.0.0
[3.1.0]: https://github.com/timbeadle/cfpathcheck/compare/3.0.6...3.1.0
[3.0.6]: https://github.com/timbeadle/cfpathcheck/compare/3.0.5...3.0.6
[3.0.5]: https://github.com/timbeadle/cfpathcheck/compare/3.0.4...3.0.5
[3.0.4]: https://github.com/timbeadle/cfpathcheck/compare/3.0.3...3.0.4
[3.0.3]: https://github.com/timbeadle/cfpathcheck/compare/3.0.2...3.0.3
[3.0.2]: https://github.com/timbeadle/cfpathcheck/compare/3.0.1...3.0.2
[3.0.1]: https://github.com/timbeadle/cfpathcheck/compare/3.0.0...3.0.1
[3.0.0]: https://github.com/timbeadle/cfpathcheck/compare/2.0.1...3.0.0
[2.0.1]: https://github.com/timbeadle/cfpathcheck/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/timbeadle/cfpathcheck/compare/1.5.0...2.0.0
[1.5.0]: https://github.com/timbeadle/cfpathcheck/compare/1.4.0...1.5.0
[1.4.0]: https://github.com/timbeadle/cfpathcheck/compare/1.3.0...1.4.0
[1.3.0]: https://github.com/timbeadle/cfpathcheck/compare/1.2.1...1.3.0
[1.2.1]: https://github.com/timbeadle/cfpathcheck/compare/1.2.0...1.2.1
[1.2.0]: https://github.com/timbeadle/cfpathcheck/compare/1.1.1...1.2.0
[1.1.1]: https://github.com/timbeadle/cfpathcheck/compare/1.1.0...1.1.1
[1.1.0]: https://github.com/timbeadle/cfpathcheck/compare/1.0.0...1.1.0
[1.0.0]: https://github.com/timbeadle/cfpathcheck/compare/0.7.1...1.0.0
[0.7.1]: https://github.com/timbeadle/cfpathcheck/compare/0.7.0...0.7.1
[0.7.0]: https://github.com/timbeadle/cfpathcheck/compare/0.6.1...0.7.0
[0.6.1]: https://github.com/timbeadle/cfpathcheck/commit/eb0693ee4e67dd1c03b47ec0b5a1c30f693750bd

(Sorry - only started tagging releases at 0.6.1)
