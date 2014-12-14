module.exports = {

    options: {
        keepAlive: true,
        noColor: false,
        includeStackTrace: false
    },

    acceptance: {
        options: {
            configFile: "test/config/acceptance.conf.js"
        }
    },

    e2e: {
        options: {
            configFile: "test/config/protractor.conf.js"
        }
    },

    "e2e-local": {
        options: {
            configFile: "test/config/e2e-base.conf.js",
            args: {
                seleniumServerJar: 'test/support/selenium-server-standalone.jar',
                capabilities: {
                    'browserName': 'chrome'
                }
            }
        }
    },

    "e2e-semi": {
        options: {
            configFile: "test/config/e2e-base.conf.js",
            args: {
                baseUrl: 'https://i-web-1.crdsrg.net:5555',
                sauceUser: 'daemonp',
                sauceKey: '2d3e8899-7ee6-4f82-a2a4-363b42a1caae'
            }
        }
    },

    "e2e-remote": {
        options: {
            configFile: "test/config/e2e-remote.conf.js",
            keepAlive: true,
            args: {
                baseUrl: 'https://i-web-1.crdsrg.net:5555',
                sauceUser: 'daemonp',
                sauceKey: '2d3e8899-7ee6-4f82-a2a4-363b42a1caae'
            }
        }
    }

};