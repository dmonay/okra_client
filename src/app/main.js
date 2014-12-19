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
        createOrg: 'http://localhost:8080/create/organization',
        updateMission: 'http://localhost:8080/update/mission/',
        updateMembers: 'http://localhost:8080/update/members/'
    });
})();

(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function AddOrganizationModalController($scope, OrganizationFactory, $modalInstance) {
        var modal = this;

        modal.createOrganization = function (name) {
            if (modal.organizationForm.$valid) {
                OrganizationFactory.createOrganization(name).then(function (response) {
                    console.log(response);
                });
            }
        };
        modal.closeModal = function () {
            $modalInstance.close();
        };
    }

    AddOrganizationModalController.$inject = ['$scope', 'OrganizationFactory', '$modalInstance'];

    app.controller('AddOrganizationModalController', AddOrganizationModalController);

})();

(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function HeaderController($scope, $modal) {
        var vm = this;

        vm.addOrganization = function () {
            var modalInstance = $modal.open({
                templateUrl: 'app/header/add-organization-modal.tpl.html',
                controller: 'AddOrganizationModalController',
                controllerAs: 'modal'
            });
        };
    }

    HeaderController.$inject = ['$scope', '$modal'];

    app.controller('HeaderController', HeaderController);

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
        "<div class=\"modal-header\"><h3 class=\"modal-title text-center\">Add Organization</h3><a href class=\"pull-right\" ng-click=\"modal.closeModal()\"><i class=\"fa fa-close\"></i></a></div><div class=\"modal-body\"><form class=\"form-horizontal\" name=\"modal.organizationForm\"><div class=\"row\"><div class=\"form-group\"><label for=\"organizationName\" class=\"col-sm-4 control-label\">Organization Name</label><div class=\"col-sm-7\"><input name=\"organizationName\" class=\"form-control\" ng-model=\"modal.organizationName\" required></div></div></div></form></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"modal.createOrganization(modal.organizationName)\">Add</button> <button class=\"btn btn-primary\" ng-click=\"modal.closeModal()\">Cancel</button></div>"
    );
}]);
