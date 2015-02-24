/**
 * Run tasks concurrently to speed things up
 */

module.exports = {
    options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config',
    },
    //DEV
    development: {
        options: {
            dest: '<%= yeoman.app %>/scripts/config.js'
        },
        constants: {
            ENV: {
                name: 'development',
                apiEndpoint: 'http://your-development.api.endpoint:3000'
            }
        }
    }
};