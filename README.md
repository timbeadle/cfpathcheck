# cf-path-check
Static analysis for cfml template import and include paths

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
