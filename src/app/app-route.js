(function () {
    'use strict';

    var router = angular.module('okra.routes', ['ui.router']);

    /**
     * @ngdoc service
     * @name uiRouter.states
     * @description
     *
     * # Routes
     * A set of front end states/routes that were created by ui-router.
     *
     */

    router.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
        /**
         * @ngdoc method
         * @name login
         * @description Route for logging in to the app.
         * @methodOf uiRouter.states
         * @param {string}
         *     url /login
         */
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.tpl.html',
                // controller: 'LoginController as vm'
            })
            /**
             * @ngdoc method
             * @name organization/tree
             * @description Route for interacting with / viewing a single tree.
             * @methodOf uiRouter.states
             * @param {string}
             *     url /organization/:organization/tree/:treeId
             */
            .state('organization/tree', {
                url: '/organization/:organization/tree/:treeId',
                templateUrl: 'app/tree/tree.tpl.html',
                controller: 'OrganizationController as vm'
            })
            /**
             * @ngdoc method
             * @name organization
             * @description Route for interacting with / viewing all the trees in an organization.
             * @methodOf uiRouter.states
             * @param {string}
             *     url /organization/:organization/trees
             */
            .state('organization', {
                url: '/organization/:organization/trees',
                templateUrl: 'app/organization/organization-trees-selection.tpl.html',
                controller: 'OrganizationController as vm'
            });
    });
})();
