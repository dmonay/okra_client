/**
 * HTML2JS is a Grunt plugin that takes all of your template files and
 * places them into JavaScript files as strings that are added to
 * AngularJS's template cache. This means that the templates too become
 * part of the initial payload as one JavaScript file. Neat!
 */

module.exports = {
    /**
     * These are the templates from `src/app`.
     */
    app: {
        options: {
            module: 'okra.templates',
            base: 'src',
            useStrict: true,
            singleModule: true,
            htmlmin: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        },
        src: [ 'src/app/**/*.tpl.html' ],
        dest: 'src/app/templates.js'
    }
};