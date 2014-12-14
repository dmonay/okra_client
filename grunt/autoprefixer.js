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
            '<%= meta.src %>/styles/css/core.css': '<%= meta.src %>/styles/css/core.css'
        }
    },
    dist: {
        files: {
            '<%= meta.dist %>/styles/css/core.css': '<%= meta.dist %>/styles/css/core.css'
        }
    }
};
