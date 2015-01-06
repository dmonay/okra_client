module.exports = {
    scripts: {
        files: ['<%= meta.src %>/app/**/*.js'],
        tasks: ['concat:js', 'jshint', 'jsbeautifier'],
        options: {
            spawn: false
        }
    },
    src: {
        files: ['<%= meta.src %>/app/**/*.html', '<%= meta.src %>/index.html'],
        tasks: ['html2js']
    },
    styles: {
        files: ['<%= meta.src %>/styles/sass/**/*.scss'],
        tasks: ['sass:dev', 'cssmin']
    },
    configFiles: {
        files: ['Gruntfile.js']
    }
};
