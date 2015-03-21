(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationSelectionController($scope, $mdDialog, OrganizationFactory, session, TreeFactory) {
        var vm = this;

        function getOrganizations() {
            OrganizationFactory.getOrganizations(session.user._id)
                .then(function (response) {
                    vm.organizations = TreeFactory.formatTrees(response.data.Success);
                });
        }

        vm.addOrganization = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/organization/add-organization-modal.tpl.html',
                controller: 'AddOrganizationModalController',
                controllerAs: 'modal'
            }).then(function (response) {
                if (response) {
                    getOrganizations();
                }
            });
        };

        function init() {
            getOrganizations();
        }

        init();
    }

    OrganizationSelectionController.$inject = ['$scope', '$mdDialog', 'OrganizationFactory', 'session',
        'TreeFactory'
    ];

    app.controller('OrganizationSelectionController', OrganizationSelectionController);

})();
