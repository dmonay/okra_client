/**
 * Uglify
 */

module.exports = {
    options: {
    	compress: true,
        mangle: true
    },
    dev: {
    	files: {
	        'dist/app/main.min.js': ['dist/app/main.js']
	    }
    }
};
