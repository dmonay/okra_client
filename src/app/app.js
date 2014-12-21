(function () {
    'use strict';

    //Define high level modules
    angular.module('SharedFactories', []);
    angular.module('HeaderModule', []);
    angular.module('OrganizationModule', []);


    var appDependencies = [
        'ui.router',
        'ngAnimate',
        'ngAria',
        // 'ui.bootstrap',
        'ngMaterial',
        'okra.templates',
        'HeaderModule',
        'SharedFactories',
        'OrganizationModule',
        'okra.routes'
    ];

    var app = angular.module('okra', appDependencies);

    //Manual Bootstrap
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['okra']);
    });

    /**
     * Configuration
     */
    app.config(function ($mdThemingProvider) {
        // $mdThemingProvider.theme('default')
        //     .primaryColor('pink')
        //     .accentColor('orange');
        $mdThemingProvider.setDefaultTheme('green');
    });

    //Constants
    app.constant('okraAPI', {
        createOrg: 'http://localhost:8080/create/organization',
        updateMission: 'http://localhost:8080/update/mission/',
        updateMembers: 'http://localhost:8080/update/members/'
    });
})();
