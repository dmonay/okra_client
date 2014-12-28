module.exports = {
    options: {
        js: {
            "indent_size": 4,
            "indent_char": " ",
            "indent_level": 0,
            "indent_with_tabs": false,
            "preserve_newlines": true,
            "max_preserve_newlines": 10,
            "jslint_happy": true,
            "brace_style": "collapse",
            "keep_array_indentation": false,
            "keep_function_indentation": false,
            "space_before_conditional": true,
            "break_chained_methods": false,
            "eval_code": false,
            "unescape_strings": false,
            "wrap_line_length": 120,

            // jsbeautify options
            "format_on_save": true,
            "use_original_indentation": false
        }
    },
    "app": {
        src : ["src/app/**/*.js", '!src/app/templates.js', '!src/app/**/*.test.js']
    },
    "pre-commit": {
        src : ["src/app/**/*.js", '!src/app/templates.js', '!src/app/**/*.test.js'],
        options : {
            mode:"VERIFY_ONLY"
        }
    }
};