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
            'assets/**/*'
        ],
        dest: '<%= meta.dist %>'
    }
};
