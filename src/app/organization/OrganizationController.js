(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationController($scope, $mdDialog, TreeFactory, $stateParams, OrganizationFactory) {
        var vm = this;

        vm.organization = $stateParams.organization;

        vm.orgMembers = [{
            userName: "slacker",
            userId: "fsdfdsfd8fds9f8ds8f7",
            role: "boss"
        }, {
            userName: "pdiddy",
            userId: "fsdfdsasdasd9f8ds8f7",
            role: "denizen"
        }];

        vm.linkedNodeIds = ['organizationNode', 'objectiveNode', 'keyResultNode', 'taskNode'];

        TreeFactory.getTrees(vm.organization)
            .then(function (response) {
                vm.trees = TreeFactory.formatTrees(response.data.Success);
            });

        vm.openOrganizationMembersModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/shared/members-modal.tpl.html',
                controller: 'MembersModalController',
                controllerAs: 'modal',
                locals: {
                    members: vm.orgMembers,
                    apiFactory: OrganizationFactory,
                    node: vm.organization
                }
            }).then(function (response) {
                vm.orgMembers = response;
            });
        };

        vm.openAddTreeModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/organization/add-tree-modal.tpl.html',
                controller: 'AddTreeModalController',
                controllerAs: 'modal',
                locals: {
                    organization: vm.organization
                }
            }).then(function (response) {
                if (response.Success) {
                    vm.formattedTrees = angular.copy(vm.trees);
                    vm.formattedTrees.push(response.Success);
                    vm.formattedTrees = _.flatten(vm.formattedTrees);
                    vm.trees = TreeFactory.formatTrees(vm.formattedTrees);
                }
            });
        };
    }

    OrganizationController.$inject = ['$scope', '$mdDialog', 'TreeFactory', '$stateParams', 'OrganizationFactory'];

    app.controller('OrganizationController', OrganizationController);

})();
