module.exports = {
    options: {
        livereload: true
    },
    scripts: {
        files: ['<%= meta.src %>/app/**/*.js'],
        tasks: ['test:unit'],
        options: {
            spawn: false
        }
    },
    src: {
        files: ['<%= meta.src %>/**/views/*.html', '<%= meta.src %>/index.html'],
        tasks: ['html2js']
    },
    styles: {
        files: ['<%= meta.src %>/styles/sass/**/*.scss'],
        tasks: ['sass:dev', 'autoprefixer:dev']
    },
    configFiles: {
        files: ['Gruntfile.js']
    }
};
