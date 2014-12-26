(function () {
    'use strict';

    //Define high level modules
    angular.module('SharedFactories', []);
    angular.module('HeaderModule', []);
    angular.module('OrganizationModule', []);
    angular.module('SharedServices', []);
    angular.module('SharedDirectives', []);


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
        'OrganizationModule',
        'okra.routes'
    ];

    var app = angular.module('okra', appDependencies);

    //Manual Bootstrap
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['okra']);
    });

    /**
     * Theme Configuration
     */
    app.config(function ($mdThemingProvider) {
        $mdThemingProvider.setDefaultTheme('okra');
    });

    //Constants
    app.constant('okraAPI', {
        createOrg: 'http://localhost:8080/create/organization',
        updateMission: 'http://localhost:8080/update/mission/',
        updateMembers: 'http://localhost:8080/update/members/',
        createTree: 'http://localhost:8080/create/tree/',
        getTreesInOrg: 'http://localhost:8080/get/trees/',
        getSingleTreeInOrg: 'http://localhost:8080/get/trees/' //ORG/TREEID
    });
})();
