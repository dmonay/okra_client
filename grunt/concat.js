/**
 * Concatenate Files
 */

module.exports = {
    js: {
        src: [
            'src/app/app.js',
            'src/app/**/*.js',
            'app-route.js',
            'src/app/app-route.js',
            '!src/app/**/*.spec.js',
            '!src/app/main.js'
        ],
        dest: 'src/app/main.js'
    }
};