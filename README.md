# cfpathcheck

Static analysis for cfml template import and include paths

[![npm version](https://img.shields.io/npm/v/cfpathcheck.svg)](https://www.npmjs.com/package/cfpathcheck)
[![Downloads/month](https://img.shields.io/npm/dm/cfpathcheck.svg)](https://www.npmjs.com/package/cfpathcheck)
[![Build Status](https://github.com/timbeadle/cfpathcheck/workflows/Node.js%20CI/badge.svg)](https://github.com/timbeadle/cfpathcheck)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Code Climate](https://codeclimate.com/github/timbeadle/cfpathcheck/badges/gpa.svg)](https://codeclimate.com/github/timbeadle/cfpathcheck)
[![DepShield Badge](https://depshield.sonatype.org/badges/timbeadle/cfpathcheck/depshield.svg)](https://depshield.github.io)
[![Known Vulnerabilities](https://snyk.io/test/github/timbeadle/cfpathcheck/badge.svg)](https://snyk.io/test/github/timbeadle/cfpathcheck)

## Installation

  `(sudo) npm install -g cfpathcheck`

* Unix/Linux/Mac OS X: Note that sudo is required unless you have set your npm environment up not to need it
* Windows: Note that sudo doesn't exist ;o)

## Usage

  `cfpathcheck PATH [-r REPORTER -o OUTFILE]`

### Options

* PATH: The path to a single .cfm file, or to a directory containing .cfm files.
* REPORTER: use checkstyle to output checkstyle-compatible xml to stdout.
* OUTFILE: The path to the output file, for integration with (e.g.) Jenkins or other CI servers.

### Release history

* See [CHANGELOG](https://github.com/timbeadle/cfpathcheck/blob/main-4.x/CHANGELOG.md).
