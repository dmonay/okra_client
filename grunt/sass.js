/**
 * Compile Sass
 */

module.exports = {
    dev: {
        options: {
            style: 'expanded'
        },
        files: {
            '<%= meta.src %>/styles/css/core.css': '<%= meta.src %>/styles/sass/core.scss'
        }
    },
    dist: {
        options: {
            style: 'compressed'
        },
        files: {
            '<%= meta.dist %>/styles/css/core.css': '<%= meta.src %>/styles/sass/core.scss'
        }
    }
};
