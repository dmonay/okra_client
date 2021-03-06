module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../../',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'src/libs/lodash.build.js',
            'src/components/angular/angular.js',
            'src/components/angular-ui-router/release/angular-ui-router.js',
            'src/components/angular-animate/angular-animate.js',
            'src/components/hammerjs/hammer.js',
            'src/components/angular-aria/angular-aria.js',
            'src/components/angular-material/angular-material.js',
            'src/components/angular-mocks/angular-mocks.js',
            'src/app/**/*.js',
            'src/components/angular-material/angular-material.css',
            'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/aes.js'
        ],


        // list of files to exclude
        exclude: [
            'src/components/angular/*.min.js',
            'src/components/angular-route/*.min.js'
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],

        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['Chrome'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false

    });
};