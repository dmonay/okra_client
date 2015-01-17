(function () {
    'use strict';

    //Define high level modules
    angular.module('SharedFactories', []);
    angular.module('HeaderModule', []);
    angular.module('OrganizationModule', []);
    angular.module('TreeModule', []);
    angular.module('SharedServices', []);
    angular.module('SharedDirectives', []);
    angular.module('SharedFilters', []);

    var appDependencies = [
        'ui.router',
        'ngAnimate',
        'ngAria',
        'ngMaterial',
        'okra.templates',
        'HeaderModule',
        'SharedFactories',
        'SharedServices',
        'SharedDirectives',
        'SharedFilters',
        'OrganizationModule',
        'TreeModule',
        'okra.routes'
    ];

    var app = angular.module('okra', appDependencies);

    //Manual Bootstrap
    angular.element(document).ready(function () {
        if (document.body.className.indexOf('ng-app') === -1) {
            angular.bootstrap(document, ['okra']);
            document.body.className = document.body.className + ' ng-app';
        }
    });

    /**
     * Theme Configuration
     */
    app.config(function ($mdThemingProvider) {
        // Extend the red theme with a few different colors
        var okraGreen = $mdThemingProvider.extendPalette('green', {
            '500': '#0d8120'
        });

        // Register the new color palette map with the name <code>neonRed</code>
        $mdThemingProvider.definePalette('okraGreen', okraGreen);
        // Use that theme for the primary intentions
        $mdThemingProvider.theme('default')
            .primaryColor('okraGreen');
    });

    //Constants
    /**
     * @ngdoc service
     * @name okra.okraAPI
     * @description
     *
     * # okraAPI
     * An object containing all the endpoints for the restful API backend.
     *
     */
    app.constant('okraAPI', {
        createOrg: 'http://localhost:8080/create/organization',
        updateMission: 'http://localhost:8080/update/mission/',
        updateMembers: 'http://localhost:8080/update/members/',
        getOrganizations: 'http://localhost:8080/get/orgs/all/',
        createTree: 'http://localhost:8080/create/tree/',
        getTreesInOrg: 'http://localhost:8080/get/trees/',
        getSingleTreeInOrg: 'http://localhost:8080/get/trees/',
        createObjective: 'http://localhost:8080/create/objective/', //objective name
        updateObjective: 'http://localhost:8080/update/objective/properties/', // orgName / treeID / objID
        createKeyResult: 'http://localhost:8080/create/kr/', //keyresult name / objective name
        updateKeyResult: 'http://localhost:8080/update/kr/properties/' // orgName / treeid / objID / krID
    });

    app.constant('hardCoded', {
        userId: '54b45bcb96a47c239a333a2d',
        userName: 'auserbro',
        org: 'someorg'
    });
})();
