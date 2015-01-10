(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationController($scope, $mdDialog, TreeFactory, $state, hardCoded) {
        var vm = this;

        vm.orgName = hardCoded.org;

        vm.missionStatement =
            'Monterey Bay Aquarium: The mission of the non-profit Monterey Bay Aquarium is to inspire conservation of the oceans.';

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

        TreeFactory.getTrees('someorg').then(function (reponse) {
            console.log(response);
        });

        vm.trees = [{
            "Name": "Monthly 12/14",
            "Id": "549dcb2befb6f7203e000001",
            "Active": true
        }, {
            "Name": "yearly 12/14",
            "Id": "549dcbe9efb6f7204b000001",
            "Active": true
        }, {
            "Name": "Make bread",
            "Id": "549dcbf2efb6f7204b000002",
            "Active": true
        }, {
            "Name": "Monthly 12/14",
            "Id": "549dcb2befb6f7203e000001",
            "Active": true
        }, {
            "Name": "yearly 12/14",
            "Id": "549dcbe9efb6f7204b000001",
            "Active": true
        }];

        vm.formattedTrees = TreeFactory.formatTrees(vm.trees);

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
