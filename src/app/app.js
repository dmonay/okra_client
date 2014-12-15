(function () {
    'use strict';

    //Define high level modules
    angular.module('SharedFactories', []);
    angular.module('HeaderModule', []);


    var appDependencies = [
        'ui.router',
        'ui.bootstrap',
        'okra.templates',
        'HeaderModule',
        'SharedFactories'
    ];

    var app = angular.module('okra', appDependencies);


    /**
     * Configuration
     */


    //Manual Bootstrap
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['okra']);
    });

    //Constants
    app.constant('okraAPI', {
        createOrg: 'http://localhost:8080/create/organization'
    });
})();
