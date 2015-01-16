module.exports = {
    'npm-install': {
        command: 'npm install'
    },
    'webdriver-update': {
        command: './node_modules/protractor/bin/webdriver-manager update'
    },
    'prep-db': {
    	command: 'scripts/seed.sh'
    }
};
