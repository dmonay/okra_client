/**
 * Run tasks concurrently to speed things up
 */

module.exports = {
    dev: [
        'newer:sass:dev',
        'newer:html2js:app'
    ],
    test: [
        'jshint',
        'newer:html2js:app'
    ],
    dist: [
        'newer:lodash',
        'html2js:app',
        'ngmin:dist',
        'sass:dist'
    ]
};
