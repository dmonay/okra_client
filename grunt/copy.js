/**
 * Copy Files to Dist
 */

module.exports = {
    dist: {
        expand: true,
        cwd: '<%= meta.src %>',
        src: [
            '{,*/}*.html',
            'lang/*',
            'assets/**/*',
            'app/main.js',
            'app/templates.js',
            'components/**/*.js',
            'components/**/*.css',
            'components/**/*.map',
            'external/dom.jsPlumb-1.7.2-min.js',
            'libs/*.js'
        ],
        dest: '<%= meta.dist %>'
    }
};
