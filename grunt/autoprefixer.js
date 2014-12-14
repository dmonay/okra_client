/**
 * Autoprefixer CSS Vendor Prefixing
 */

module.exports = {
    options: {
        browsers: ['last 2 versions'],
        cascade: true
    },
    dev: {
        files: {
            '<%= meta.src %>/styles/css/main.css': '<%= meta.src %>/styles/css/main.css'
        }
    },
    dist: {
        files: {
            '<%= meta.dist %>/styles/css/main.css': '<%= meta.dist %>/styles/css/main.css'
        }
    }
};
