/**
 * Compile Sass
 */

module.exports = {
    dev: {
        options: {
            style: 'expanded'
        },
        files: {
            '<%= meta.src %>/styles/css/main.css': '<%= meta.src %>/styles/sass/main.scss'
        }
    },
    dist: {
        options: {
            style: 'compressed'
        },
        files: {
            '<%= meta.dist %>/styles/css/main.min.css': '<%= meta.src %>/styles/sass/main.scss'
        }
    }
};
