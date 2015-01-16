'use strict';

module.exports = function (grunt) {

    /**
     * Import Task Packages
     */

    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt);


    /**
     * Testing tasks
     */
    grunt.registerTask('test', function () {
        grunt.log
            .writeln('')
            .writeln('==========================================================================================')
            .writeln('grunt test:unit            # run unit tests')
            .writeln('grunt test:watch           # run unit tests continuously, watching for changes')
            .writeln('grunt test:reports         # run unit & coverage tests and output results to ./reports')
            .writeln('grunt test:e2e:local       # run e2e tests using localhost against a local browser')
            .writeln('grunt test:e2e:semi        # run e2e tests using localhost on sauce labs via sauce connect')
            .writeln('grunt test:e2e:remote      # run e2e tests using saucelabs')
            .writeln('==========================================================================================')
            .writeln('');
    });

    grunt.registerTask('test:unit', [
        'concurrent:test',
        'karma:unit'
    ]);

    grunt.registerTask('test:watch', [
        'concurrent:test',
        'karma:watch'
    ]);

    grunt.registerTask('test:reports', [
        'karma:reports'
    ]);

    grunt.registerTask('test:e2e:local', [
        'shell:webdriver-update',
        'if-missing:curl:selenium',
        'protractor:e2e-local'
    ]);

    grunt.registerTask('test:full', [
        'shell:prep-db',
        'karma:unit',
        'protractor'
    ]);

    /**
     * Docs tasks
     */
    grunt.registerTask('docs', [
        'ngdocs',
        'connect:docs',
        'watch'
    ]);


    /**
     * Build, serve & dist tasks
     */
    var serveBaseTasks = [
        'newer:lodash',
        'concurrent:dev',
        // 'karma:unit',
        // 'newer:autoprefixer:dev',
        'connect:app'];

    grunt.registerTask('serve', serveBaseTasks.concat([
        'watch'
    ]));


    // 'grunt dist' builds dist folder with fully optimised files
    grunt.registerTask('dist', [
        'clean:dist',
        'concurrent:dist',
        'copy',
        'autoprefixer:dist',
        'test:unit',
        'test:reports',
        'ngdocs',
        'useminPrepare',
        'concat',
        'uglify',
        'usemin'
    ]);

};
