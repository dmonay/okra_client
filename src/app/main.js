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

(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function AddOrganizationModalController($scope, OrganizationFactory, $modal) {
        var modal = this;


    }

    AddOrganizationModalController.$inject = ['$scope', 'OrganizationFactory'];

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
                    organization: orgName
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
        "<div class=\"modal-header\"><h3 class=\"modal-title text-center\">Add Organization</h3><a href ng-click=\"modal.closeModal()\">X</a></div><div class=\"modal-body\"><form><label>Organization Name</label><input></form></div><div class=\"modal-footer\"><button>Add</button> <button>Cancel</button></div>"
    );
}]);
