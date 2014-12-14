(function () {
    'use strict';

    var app = angular.module('okra.routes', ['ui.router']);

    app.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var storePath = $location.path().split('/').slice(0, 2).join('/');
            return storePath + '/error/404/?path=' + $location.$$path;
        });

        // Make trailing slash optional
        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path(),
                search = $location.search(),
                params;

            if (path[path.length - 1] === '/') {
                return;
            }

            if (Object.keys(search).length === 0) {
                return path + '/';
            }

            params = [];
            angular.forEach(search, function (v, k) {
                params.push(k + '=' + v);
            });

            return path + '/?' + params.join('&');
        });

    });
})();
