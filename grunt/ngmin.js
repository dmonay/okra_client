/**
 * Angular Friendly Minification
 */

module.exports = {
    dist: {
        files: [{
            expand: true,
            cwd: 'dist/app/',
            src: 'main.js',
            dest: 'dist/app'
        }]
    }
};
