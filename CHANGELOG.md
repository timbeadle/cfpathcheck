# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/).

## [11.2.0] - 2026-01-27
### Added
- @stylistic/object-curly-spacing and @stylistic/arrow-parens xo linting rules

### Updated
- Parantheses around arrow function args to match updated linting rules
- @snyk/protect@1.1302.1
- chalk@5.6.2
- glob@13.0.0
- @types/chai@5.2.3
- @types/node@25.0.10
- chai@6.2.2
- globals@17.2.0
- ls-engines@0.9.4
- mocha@11.7.5
- npm-run-all2@8.0.4
- prettier@3.8.1
- rimraf@6.1.2
- typescript@5.9.3
- xo@1.2.3
- (engines) node@20.20.0
- (Volta) node@20.20.0
- (Volta) npm@11.8.0

### Removed
- Depshield badge

## [11.1.0] - 2025-05-22
### Updated
- @snyk/protect@1.1297.1
- @types/chai@5.2.2
- @types/mocha@10.0.10
- @types/node@22.15.21
- chai@5.2.0
- chalk@5.4.1
- glob@11.0.2
- globals@16.1.0
- log-symbols@7.0.1
- mocha@11.4.0
- npm-run-all2@8.0.3
- prettier@3.5.3
- rimraf@6.0.1
- typescript@5.8.3
- xo@0.60.0
- engines.node: >= 20.19.1
- volta.node: 20.19.1
- volta.npm: 11.4.0

## [11.0.0] - 2024-10-14
### Added
- xo

### Updated
- fs, path -> node:fs, node:path
- @snyk/protect@1.1293.1
- @types/chai@5.0.0
- @types/mocha@10.0.9
- @types/node@22.7.5
- glob@11.0.0
- globals@15.11.0
- log-symbols@7.0.0
- ls-engines@0.9.3
- mocha@10.7.3
- npm-run-all2@6.2.3
- nyc@17.1.0
- rimraf@5.0.10
- typescript@5.6.3
- Volta: node@20.18.0, npm@10.9.0

### Removed
- BREAKING NodeJS v18 support
- eslint
- eslint-config-xo
- eslint-plugin-import & annotations
- eslint-plugin-redos & annotations
- NodeJS v18 & v21 test runs

## [10.1.0] - 2024-07-30
### Added
- NodeJS v22 test run.
- fixtures/test-script.cfm, for testing cfscript syntax imports.
- rimraf package, to clean up the `dist` folder before building ts type files.
-  tsconfig.json: `"moduleResolution@Node

### Updated
- Internal rewrite, splitting the monolithic cfpathcheck.js module into more focused, smaller modules.
  - The external API hasn't changed, however, so this is only a minor version increment.
- package.json: engines.node: 18 -> 18.20.3
- @snyk/protect@1.1292.1
- @types/chai@4.3.16
- @types/mocha@10.0.7
- @types/node@22.0.0
- chai@5.1.1
- eslint-config-xo@0.45.0
- glob@10.4.5
- ls-engines@0.9.2
- mocha@10.7.0
- npm-run-all2@6.2.2
- nyc@17.0.0
- prettier@3.3.3
- typescript@5.5.4
- (volta) node@18.20.3
- (volta) npm@10.8.2

### Removed
- Unnecessary `format` argument in the call to the `check(file)` function.

## [10.0.2] - 2024-03-16
### Updated
- Object.prototype.hasOwnProperty.call() -> Object.hasOwn()
- Formatting for new eslint rules
- @snyk/protect@1.1284.0
- @types/chai@4.3.12
- @types/node@20.11.28
- chai@5.1.0
- eslint-config-xo@0.44.0
- eslint@8.57.0
- mocha@10.3.0
- npm-run-all2@6.1.2
- prettier@3.2.5
- typescript@5.4.2
- (Volta) npm@10.5.0

## [10.0.1] - 2024-01-16
### Added
- eslint annotations to work around chai lint issues in v5
- NodeJS v21 test run

### Updated
- 8.x marked as obsolete
- @snyk/protect@1.1269.0
- @types/chai@4.3.11
- @types/checkstyle-formatter@1.0.2
- @types/deep-equal@1.0.4
- @types/minimist@1.2.5
- @types/mocha@10.0.6
- @types/node@20.11.2
- chai@5.0.0
- deep-equal@2.2.3
- eslint-plugin-import@2.29.1
- eslint@8.56.0
- ls-engines@0.9.1
- prettier@3.2.2
- typescript@5.3.3
- (volta) npm@10.3.0
- github/codeql-action/init@v3
- github/codeql-action/autobuild@v3
- github/codeql-action/analyze@v3
- actions/setup-node@v4

## [10.0.0] - 2023-10-23

### Added
- **Dependabot**: Add `versioning-strategy: increase` setting.
- **Renovate**: Add `packageRules` (to group eslint package upgrades), `rangeStrategy` and `transitiveRemediation` settings.

### Updated
- @snyk/protect@1.1236.0
- @types/chai@4.3.9
- @types/checkstyle-formatter@1.0.1
- @types/deep-equal@1.0.3
- @types/minimist@1.2.4
- @types/mocha@10.0.3
- @types/node@20.8.7
- chai@4.3.10
- eslint-plugin-import@2.29.0
- eslint@8.52.0
- glob@10.3.10
- log-symbols@6.0.0

### Removed
- **BREAKING**: NodeJS support <18
- nodejs 16.x test run

## [9.0.0] - 2023-09-26
### Updated
- @snyk/protect@1.1227.0
- deep-equal@2.2.2
- glob@10.3.8
- @types/chai@4.3.6
- @types/deep-equal@1.0.2
- @types/node@20.7.0
- chai@4.3.8
- eslint@8.50.0
- eslint-plugin-import@2.28.1
- prettier@3.0.3
- typescript@5.2.2
- node@16.20.2
- npm@9.8.1
- actions/checkout@v4

### Removed
- BREAKING: NodeJS support <16.14
- Node 14.x, 14.17.x test runs

## [8.1.3] - 2023-06-30
### Updated
- @snyk/protect@1.1187.0
- @types/node@20.3.2
- chalk@5.3.0
- glob@10.3.1
- npm@8.19.4 (volta pin)
- typescript@5.1.6
- `npm audit fix` was run to reduce vulnerabilities

## [8.1.2] - 2023-06-02
### Added
- nodejs v14.17.x, v20 test runs
- volta pinning of node@14.17.6, npm@7.24.2

### Updated
- cfpathcheck@5 marked as obsolete in README.md
- @snyk/protect@1.1173.0
- @types/chai@4.3.5
- @types/node@20.2.5
- deep-equal@2.2.1
- eslint@8.41.0
- glob@10.2.6
- prettier@2.8.8
- typescript@5.1.3

### Removed
- nodejs v19 test run

## [8.1.1] - 2023-04-11
### Updated
- @snyk/protect@1.1140.0
- @types/node@18.15.11
- chalk@5.2.0
- deep-equal@2.2.0
- eslint@8.38.0
- minimist@1.2.8
- prettier@2.8.7
- typescript@5.0.4

## [8.1.0] - 2023-03-22
### Added
- Type definitions (generated using `tsc` via the `build:types` npm script)
- @types/node
- typescript

### Updated
- prettier@2.8.6

## [8.0.0] - 2023-03-17
### Added
- Version support matrix

### Updated
- `sync` is now imported directly from `glob`
- @snyk/protect@1.1120.0
- @types/glob@8.1.0
- eslint-plugin-redos@4.4.5
- eslint@8.36.0
- glob@9.1.0
- prettier@2.8.4

### Removed
- Breaking: NodeJS support <14.17

## [7.0.1] - 2023-03-15
### Updated
- @snyk/protect@1.1118.0
- minimist@1.2.8
- @types/glob@8.1.0
- eslint@8.36.0
- eslint-plugin-redos@4.4.5
- prettier@2.8.4
- workflow base branch -> main-7.x

## [7.0.0] - 2023-02-07
### Updated
- .eslintrc option env.es2021 -> env.es6
- .eslintrc option parserOptions.ecmaVersion: 13 -> 2021
- @snyk/protect@1.1097.0
- @types/chai@4.3.4
- @types/glob@8.0.1
- @types/mocha@10.0.1
- chai@4.3.7
- eslint@8.33.0
- eslint-config-xo@0.43.1
- eslint-plugin-import@2.27.5
- eslint-plugin-redos@4.4.3
- glob@8.1.0
- ls-engines@s0.9.0
- mocha@10.2.0
- prettier@2.8.3

### Removed
- Breaking: NodeJS support <14.13
- NodeJS 12.x test run

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

[11.2.0]: https://github.com/timbeadle/cfpathcheck/compare/11.1.0...11.2.0
[11.1.0]: https://github.com/timbeadle/cfpathcheck/compare/11.0.0...11.1.0
[11.0.0]: https://github.com/timbeadle/cfpathcheck/compare/10.1.0...11.0.0
[10.1.0]: https://github.com/timbeadle/cfpathcheck/compare/10.0.2...10.1.0
[10.0.2]: https://github.com/timbeadle/cfpathcheck/compare/10.0.1...10.0.2
[10.0.1]: https://github.com/timbeadle/cfpathcheck/compare/10.0.0...10.0.1
[10.0.0]: https://github.com/timbeadle/cfpathcheck/compare/9.0.0...10.0.0
[9.0.0]: https://github.com/timbeadle/cfpathcheck/compare/8.1.3...9.0.0
[8.1.3]: https://github.com/timbeadle/cfpathcheck/compare/8.1.2...8.1.3
[8.1.2]: https://github.com/timbeadle/cfpathcheck/compare/8.1.1...8.1.2
[8.1.1]: https://github.com/timbeadle/cfpathcheck/compare/8.1.0...8.1.1
[8.1.0]: https://github.com/timbeadle/cfpathcheck/compare/8.0.0...8.1.0
[8.0.0]: https://github.com/timbeadle/cfpathcheck/compare/7.0.1...8.0.0
[7.0.1]: https://github.com/timbeadle/cfpathcheck/compare/7.0.0...7.0.1
[7.0.0]: https://github.com/timbeadle/cfpathcheck/compare/6.0.0...7.0.0
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
