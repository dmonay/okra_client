(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationController($scope, $mdDialog, TreeFactory, $state, hardCoded) {
        var vm = this;

        vm.orgName = hardCoded.org;

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

        TreeFactory.getTrees('someorg')
            .then(function (response) {
                vm.trees = TreeFactory.formatTrees(response.data);
            });

        vm.openOrganizationMembersModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/organization/organization-members-modal.tpl.html',
                controller: 'OrganizationMembersModalController',
                controllerAs: 'modal',
                locals: {
                    members: vm.orgMembers
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
                controllerAs: 'modal'
            }).then(function (response) {
                if (response) {
                    vm.trees.push(response);
                    vm.formattedTrees = TreeFactory.formatTrees(vm.trees);
                }
            });
        };
    }

    OrganizationController.$inject = ['$scope', '$mdDialog', 'TreeFactory', '$state', 'hardCoded'];

    app.controller('OrganizationController', OrganizationController);

})();
