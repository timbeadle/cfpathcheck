# cfpathcheck

Static analysis for cfml template import and include paths

[![npm version](https://img.shields.io/npm/v/cfpathcheck.svg)](https://www.npmjs.com/package/cfpathcheck)
[![Downloads/month](https://img.shields.io/npm/dm/cfpathcheck.svg)](https://www.npmjs.com/package/cfpathcheck)
[![Build Status](https://travis-ci.org/timbeadle/cfpathcheck.svg?branch=master)](https://travis-ci.org/timbeadle/cfpathcheck)
[![Dependency Status](https://david-dm.org/timbeadle/cfpathcheck.svg)](https://david-dm.org/timbeadle/cfpathcheck)
[![devDependency Status](https://david-dm.org/timbeadle/cfpathcheck/dev-status.svg)](https://david-dm.org/timbeadle/cfpathcheck#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/timbeadle/cfpathcheck/badges/gpa.svg)](https://codeclimate.com/github/timbeadle/cfpathcheck)
[![DepShield Badge](https://depshield.sonatype.org/badges/timbeadle/cfpathcheck/depshield.svg)](https://depshield.github.io)

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
