'use strict';

/**
 * Karma test runner
 */

function extractFolder(browser) {
    return browser.toLowerCase().split(/[ /-]/)[0];
}

module.exports = {

    options: {
        configFile: 'test/config/karma.conf.js'
    },

    unit: {
        background: false,
        browsers: ['PhantomJS'],
        logLevel: 'WARN',
        singleRun: true,
        runnerPort: 9999,
        plugins: [
            "karma-jasmine",
            "karma-phantomjs-launcher"
        ]
    },

    watch: {
        singleRun: false,
        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            "karma-jasmine",
            "karma-phantomjs-launcher"
        ],
        reporters: [
            'progress'
        ]
    },

    reports: {
        background: false,
        singleRun: true,
        plugins: [
            "karma-jasmine",
            "karma-coverage",
            "karma-phantomjs-launcher",
            'karma-junit-reporter'
        ],
        browsers: ['PhantomJS'],
        preprocessors: {
            'src/app/**/!(*.spec).js': ['coverage']
        },
        reporters: [
            'coverage',
            'junit'
        ],
        junitReporter: {
            outputFile: 'reports/test/test-results.xml'
        },
        coverageReporter: {
            reporters: [
                { type: 'cobertura', dir: 'reports/coverage/', subdir: extractFolder },
                { type: 'html', dir: 'reports/coverage/', subdir: extractFolder }
            ]
        }
    }

};
