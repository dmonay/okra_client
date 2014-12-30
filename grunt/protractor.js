module.exports = {

    options: {
        keepAlive: true,
        noColor: false,
        includeStackTrace: false
    },

    e2e: {
        options: {
            configFile: "test/config/protractor.conf.js"
        }
    }
};
