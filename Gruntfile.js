/*
 * cfpathcheck
 * https://github.com/timbeadle/cfpathcheck
 *
 * Copyright (c) 2015 Tim Beadle
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
	grunt.initConfig({
		eslint: {
			extends: 'eslint:recommended',
			src: ['lib/*.js']
		}
	});

	grunt.registerTask('test', ['eslint']);

	grunt.loadNpmTasks('gruntify-eslint');
	grunt.loadNpmTasks('grunt-release');
};
