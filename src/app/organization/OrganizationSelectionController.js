(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationSelectionController($scope, $mdDialog, TreeFactory, hardCoded) {
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

    OrganizationSelectionController.$inject = ['$scope', '$mdDialog', 'TreeFactory', 'hardCoded'];

    app.controller('OrganizationSelectionController', OrganizationSelectionController);

})();
