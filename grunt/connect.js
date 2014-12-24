'use strict';
/**
 * The `connect` task starts a connect server
 */

function middleware(connect, options, middlwares) {
    return [
        connect.compress(),
        connect.static(options.base)
    ];
}

module.exports = {
    app: {
        options: {
            port: 3333,
            base: '<%= meta.src %>',
            middleware: middleware
        }
    },
    acceptance: {
        options: {
            port: 3333,
            keepalive: true,
            base: '<%= meta.src %>',
            middleware: middleware
        }
    },
    dist: {
        options: {
            port: 3333,
            keepalive: true,
            base: '<%= meta.dist %>',
            middleware: middleware
        }
    },
    docs: {
        options: {
            port: 4445,
            base: 'docs'
        }
    }
};
