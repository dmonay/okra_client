module.exports = {
    dist: {
      options: {
          patterns: [{
              match: /http:\/\/localhost:8080/g,
              replacement: 'https://evening-river-9352.herokuapp.com'
          }]
      },
      files: [{
          expand: true,
          flatten: true,
          src: ['dist/app/main.js'],
          dest: 'dist/app/'
      }]
    },
    local: {
      options: {
          patterns: [{
              match: /https:\/\/evening-river-9352.herokuapp.com/g,
              replacement: 'http://localhost:8080'
          }]
      },
      files: [{
          expand: true,
          flatten: true,
          src: ['dist/app/main.js'],
          dest: 'dist/app/'
      }]
    }
};