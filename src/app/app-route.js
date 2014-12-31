(function () {
    'use strict';

    var router = angular.module('okra.routes', ['ui.router']);

    router.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.tpl.html',
                // controller: 'LoginController as vm'
            })
            .state('organization/tree', {
                url: '/organization/:organization/tree/:treeId',
                templateUrl: 'app/organization/organization-tree.tpl.html',
                controller: 'OrganizationController as vm'
            })
            .state('organization', {
                url: '/organization/:organization/trees',
                templateUrl: 'app/organization/organization-trees-selection.tpl.html',
                controller: 'OrganizationController as vm'
            });
    });
})();
