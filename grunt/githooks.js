module.exports = {
    all: {
        'pre-commit': 'jshint jsbeautifier:pre-commit',
        'pre-push': ['karma', 'protractor'],
        // 'post-merge': 'shell:npm-install'
    }
};
