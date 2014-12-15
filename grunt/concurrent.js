/**
 * Run tasks concurrently to speed things up
 */

module.exports = {
    dev: [
        'sass:dev',
        'html2js:app'
    ],
    test: [
        'jshint',
        'html2js:app'
    ],
    dist: [
        'lodash',
        'html2js:app',
        'ngmin:dist',
        'sass:dist'
    ]
};
