(function () {
    'use strict';

    //Define high level modules
    angular.module('SharedFactories', []);
    angular.module('HeaderModule', []);
    angular.module('OrganizationModule', []);
    angular.module('TreeModule', []);
    angular.module('LoginModule', []);
    angular.module('SharedServices', []);
    angular.module('SharedDirectives', []);
    angular.module('SharedFilters', []);

    var appDependencies = [
        'ui.router',
        'ngAnimate',
        'ipCookie',
        'ngAria',
        'ngMaterial',
        'okra.templates',
        'HeaderModule',
        'LoginModule',
        'OrganizationModule',
        'TreeModule',
        'SharedFactories',
        'SharedServices',
        'SharedDirectives',
        'SharedFilters',
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
        //create color palletes
        var okraGreen = $mdThemingProvider.extendPalette('green', {
            '500': '#99b742',
        });
        var okraGreenAccent = $mdThemingProvider.extendPalette('green', {
            'A200': '#99b742'
        });

        //define color extensions
        $mdThemingProvider.definePalette('okraGreen', okraGreen);
        $mdThemingProvider.definePalette('okraGreenAccent', okraGreenAccent);

        //register extensions to the theme
        $mdThemingProvider.theme('default')
            .primaryPalette('okraGreen')
            .accentPalette('okraGreenAccent');
    });

    //get the bootstrap data for the app
    app.run(function ($http, $location, $rootScope, $state, $window, session) {
        $http.get('app/bootstrapper.json').success(function (data) {
            session.storeCredentials(data);
        });

        $window.isAuthenticated = function () {
            session.isAuthenticated();
        };

        //make sure users login before using the app
        $rootScope.$on('$stateChangeSuccess', function () {
            if ($state.current.name != "login" && !session.user) {
                $state.go('login');
            }
            if ($state.current.name == "login" && session.user) {
                $state.go('organizations');
            }
        });

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
        getUser: 'http://localhost:8080/get/users/all/',
        registerUser: 'http://localhost:8080/register',
        createOrg: 'http://localhost:8080/create/organization',
        updateMission: 'http://localhost:8080/update/mission/',
        updateMembers: 'http://localhost:8080/update/members/',
        getOrganizations: 'http://localhost:8080/get/orgs/all/',
        createTree: 'http://localhost:8080/create/tree/',
        getTreesInOrg: 'http://localhost:8080/get/trees/',
        getSingleTreeInOrg: 'http://localhost:8080/get/trees/',
        createObjective: 'http://localhost:8080/create/objective/', // objective name
        updateObjective: 'http://localhost:8080/update/objective/properties/', // orgName / treeID / objID
        createKeyResult: 'http://localhost:8080/create/kr/', // keyresult name / objective name
        updateKeyResult: 'http://localhost:8080/update/kr/properties/', // orgName / treeid / objID / krIndex
        createTask: 'http://localhost:8080/create/task/', // orgName / objId / taskIndex
        updateTask: 'http://localhost:8080/update/task/properties/' // orgName / treeId / objId / krIndex / taskIndex
    });

    //could turn this into a service? So we can change whenever we want for 2.0
    app.constant('jsPlumbDefaults', {
        PaintStyle: {
            lineWidth: 3,
            strokeStyle: "#99b742",
            outlineWidth: 1
        },
        EndpointStyle: {
            fillStyle: "#99b742",
            radius: 4
        },
        Connector: ["Bezier", {
            curviness: 20
        }],
        Anchors: ["BottomCenter", "TopCenter"],
        ConnectionsDetachable: false,
        ReattachConnections: false

    });

})();
