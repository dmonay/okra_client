/**
 * Tidy Up Time
 */

module.exports = {
    dist: [
        'dist',
        'docs',
        'reports',
        '*.log',
        '.tmp',
        '<%= meta.src %>/styles/css/*',
        '.sass-cache'
    ]
};
