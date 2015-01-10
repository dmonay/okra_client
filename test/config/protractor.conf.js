exports.config = {
    seleniumServerJar: null,
    seleniumPort: null,
    chromeDriver: '../../node_modules/chromedriver/bin/chromedriver',

    specs: [
        '../e2e/*.js',
        '../e2e/**/*.js'
    ],

    suites: {
        routes: '../e2e/routes.js',
        organization: '../e2e/organization/*.js',
        tree: '../e2e/tree/*.js'
    },

    // A base URL for your application under test
    baseUrl: 'http://localhost:3333',

    onPrepare: function() {
        browser.helpers = require('../e2e/utils/helpers.js');
    },
};