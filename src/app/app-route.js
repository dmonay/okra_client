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
        $urlRouterProvider.otherwise('/404');

        $stateProvider
        /**
         * @ngdoc method
         * @name 404
         * @description Route for a page not found error (404).
         * @methodOf uiRouter.states
         * @param {string}
         *     url /404
         */
            .state('404', {
                url: '/404',
                templateUrl: 'app/shared/404.tpl.html'
            })
            /**
             * @ngdoc method
             * @name login
             * @description Route for logging in to the app. (acts as the base url)
             * @methodOf uiRouter.states
             * @param {string}
             *     url /
             */
            .state('login', {
                url: '/',
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
                controller: 'TreeController as vm'
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
