# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

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
