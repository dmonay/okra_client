/**
 * Minify css files
 */

module.exports = {
    target: {
        files: {
          'src/styles/css/main.min.css': ['src/styles/css/main.css']
        }
    }
};