(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationSelectionController($scope, $mdDialog, OrganizationFactory, hardCoded, TreeFactory) {
        var vm = this;

        OrganizationFactory.getOrganizations(hardCoded.userId)
            .then(function (response) {
                vm.organizations = TreeFactory.formatTrees(response.data.Success);
            });

        vm.addOrganization = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/header/add-organization-modal.tpl.html',
                controller: 'AddOrganizationModalController',
                controllerAs: 'modal'
            });
        };
    }

    OrganizationSelectionController.$inject = ['$scope', '$mdDialog', 'OrganizationFactory', 'hardCoded',
        'TreeFactory'
    ];

    app.controller('OrganizationSelectionController', OrganizationSelectionController);

})();
