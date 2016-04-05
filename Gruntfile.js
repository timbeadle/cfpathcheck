/*
 * cfpathcheck
 * https://github.com/timbeadle/cfpathcheck
 *
 * Copyright (c) 2015 Tim Beadle
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
	// load all npm grunt tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		eslint: {
			options: {
				configFile: '.eslintrc.json'
			},
			src: ['lib/*.js']
		}
	});

	grunt.registerTask('test', ['eslint']);

};
