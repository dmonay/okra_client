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
