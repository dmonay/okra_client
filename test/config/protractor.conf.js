exports.config = {
    seleniumPort: null,
    chromeDriver: '../../node_modules/chromedriver/bin/chromedriver',

    specs: [
        '../e2e/*.js',
        '../e2e/**/*.js'
    ],

    // suites: {
    // test: 'test.js'
    // },

    // A base URL for your application under test
    baseUrl: 'http://localhost:3333'
};