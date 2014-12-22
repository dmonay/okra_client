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
     * Theme Configuration
     */
    app.config(function ($mdThemingProvider) {
        $mdThemingProvider.setDefaultTheme('okra');
    });

    //Constants
    app.constant('okraAPI', {
        createOrg: 'http://localhost:8080/create/organization',
        updateMission: 'http://localhost:8080/update/mission/',
        updateMembers: 'http://localhost:8080/update/members/'
    });
})();

(function () {
    'use strict';

    var router = angular.module('okra.routes', ['ui.router']);

    router.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('organization', {
                url: '/organization/:organization',
                templateUrl: 'app/organization/organization-tree.tpl.html',
                controller: 'OrganizationController as vm'
            });
    });
})();

(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function AddOrganizationModalController($scope, OrganizationFactory, $mdDialog) {
        var modal = this;

        modal.createOrganization = function (name) {
            if (modal.organizationForm.$valid) {
                OrganizationFactory.createOrganization(name).then(function (response) {
                    console.log(response);
                });
            }
        };
        modal.closeModal = function () {
            $mdDialog.hide();
        };
    }

    AddOrganizationModalController.$inject = ['$scope', 'OrganizationFactory', '$mdDialog'];

    app.controller('AddOrganizationModalController', AddOrganizationModalController);

})();

(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function HeaderController($scope, $mdDialog) {
        var vm = this;

        vm.addOrganization = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/header/add-organization-modal.tpl.html',
                controller: 'AddOrganizationModalController',
                controllerAs: 'modal'
            });
        };
    }

    HeaderController.$inject = ['$scope', '$mdDialog'];

    app.controller('HeaderController', HeaderController);

})();

(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationController($scope) {
        var vm = this;
    }

    OrganizationController.$inject = ['$scope'];

    app.controller('OrganizationController', OrganizationController);

})();

(function () {
    'use strict';

    var app = angular.module('SharedFactories');

    function OrganizationFactory($http, okraAPI) {
        var organizationAPI = {
            createOrganization: function (orgName) {
                return $http.post(okraAPI.createOrg, {
                    organization: orgName,
                    userId: "548e3feebee23fc7375b788b"
                });
            },
            updateMission: function (orgName, mission) {
                var url = okraAPI.updateMission + orgName;
                return $http.post(url, {
                    mission: mission
                });
            },
            updateMembers: function (orgName, members) {
                var url = okraAPI.updateMembers + orgName;
                return $http.post(url, {
                    "members": members
                });
            }
        };

        return organizationAPI;
    }

    OrganizationFactory.$inject = ['$http', 'okraAPI'];

    app.factory('OrganizationFactory', OrganizationFactory);

})();

angular.module('okra.templates', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put("app/header/add-organization-modal.tpl.html",
        "<md-dialog flex=\"30\"><div layout=\"row\" layout-align=\"center\"><md-subheader><h3>Add An Organization</h3></md-subheader></div><md-content><div layout=\"row\" layout-align=\"center\"><form class=\"form-horizontal\" name=\"modal.organizationForm\"><md-text-float class=\"long\" label=\"Organization Name\" ng-model=\"modal.organizationName\"></md-text-float></form></div><md-content><div class=\"md-actions\" layout=\"row\" layout-align=\"center end\"><md-button class=\"md-raised md-warn\" ng-click=\"modal.closeModal()\" aria-label=\"cancel\">Cancel</md-button><md-button class=\"md-raised md-primary\" ng-click=\"modal.createOrganization(modal.organizationName)\" aria-label=\"add\">Add</md-button></div><md-dialog></md-dialog></md-content></md-content></md-dialog>"
    );
    $templateCache.put("app/organization/organization-tree.tpl.html",
        "<section class=\"organization-wrapper\"><div layout=\"row\" layout-align=\"center\"><div class=\"tree-node active\">Organization #1</div><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised md-warn\" aria-label=\"toggle\"><i class=\"fa fa-minus\"></i></md-button><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div></div><div layout=\"row\">The mission of this organization is to blah blah blah blah blah blah blah blah blah blahblah blah blah blah blahblah blah blah blah blahblah blah blah blah blahblah blah blah blah blahblah blah blah blah blahblah blah blah blah blahblah blah blah blah blahblah blah blah blah blahblah blah blah blah blahblah blah blah blah blahblah blah blah blah blahblah blah blah blah blahblah blah blah blah blahblah blah blah blah blah</div><div layout=\"row\" layout-align=\"center center\"><div class=\"objective\" layout=\"row\" layout-align=\"start\"><div class=\"tree-node active\" layout-align=\"start\">Objective #1</div><div layout=\"column\" layout-align=\"end end\"><md-button href class=\"md-raised md-warn\" aria-label=\"toggle\"><i class=\"fa fa-minus\"></i></md-button><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div></div><div class=\"objective\" layout=\"row\" layout-align=\"start\" ng-repeat=\"objective in [1, 2, 3]\"><div class=\"tree-node\" layout-align=\"start\">Objective {{$index + 2}}</div><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised\" aria-label=\"toggle\"><i class=\"fa fa-plus\"></i></md-button></div></div></div><div layout=\"row\" layout-align=\"center center\"><div class=\"key-result\" layout=\"row\" layout-align=\"start\"><div class=\"tree-node active\">Key Result #1</div><div layout=\"column\" layout-align=\"end end\"><md-button href class=\"md-raised md-warn\" aria-label=\"toggle\"><i class=\"fa fa-minus\"></i></md-button><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div></div><div class=\"key-result\" layout=\"row\" layout-align=\"start\"><div class=\"tree-node\">Key Result #2</div><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised md-warn\" aria-label=\"toggle\"><i class=\"fa fa-plus\"></i></md-button></div></div></div><div layout=\"column\" layout-align=\"center center\"><div layout=\"row\" layout-align=\"start center\" ng-repeat=\"task in [1, 2, 3, 4]\"><md-checkbox ng-model=\"vm.isChecked[$index]\" aria-label></md-checkbox><div class=\"task-node\">Task {{$index + 1}}</div></div></div></section>"
    );
}]);
