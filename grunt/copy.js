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
            'app/main.js'
        ],
        dest: '<%= meta.dist %>'
    }
};
