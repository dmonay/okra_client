/**
 * Angular Friendly Minification
 */

module.exports = {
    dist: {
        files: [{
            expand: true,
            cwd: '<%= meta.src %>/app/app.js',
            src: '*.js',
            dest: '<%= meta.dist %>/app'
        }]
    }
};
