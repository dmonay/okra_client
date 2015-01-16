(function () {
    'use strict';

    var app = angular.module('TreeModule');

    function TreeController($scope, $mdDialog, TreeFactory, $stateParams, $filter) {
        var vm = this,
            treeId = $filter('okDecrypt')($stateParams.treeIdEnc);

        function getTree() {
            TreeFactory.getSingleTree($stateParams.organization, treeId)
                .then(function (response) {
                    vm.tree = response.data.Success;
                });
        }

        vm.linkedNodeIds = ['organizationNode', 'objectiveNode', 'keyResultNode', 'taskNode'];

        vm.changeCurrentObjective = function (objective) {
            vm.currentObjective = objective;
        };

        vm.changeCurrentKeyResult = function (keyResult) {
            vm.currentKeyResult = keyResult;
        };

        vm.openMissionStatementModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/tree/mission-statement-modal.tpl.html',
                controller: 'MissionStatementModalController',
                controllerAs: 'modal',
                locals: {
                    missionStatement: vm.tree.Mission
                }
            }).then(function (response) {
                vm.tree.Mission = response;
            });
        };

        vm.openTreeMembersModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/shared/members-modal.tpl.html',
                controller: 'MembersModalController',
                controllerAs: 'modal',
                locals: {
                    members: vm.tree.Members,
                    apiFactory: TreeFactory,
                    node: vm.tree
                }
            }).then(function (response) {
                if (response) {
                    vm.tree.Members.push(response);
                }
            });
        };

        vm.openNodeModalDashboard = function ($event, editMode, nodeType, node, parentNode) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/tree/node-modal-dashboard.tpl.html',
                controller: 'NodeModalDashboardController',
                controllerAs: 'modal',
                locals: {
                    editMode: editMode,
                    nodeType: nodeType,
                    node: node,
                    tree: vm.tree,
                    parentNode: parentNode
                }
            }).then(function (response) {
                if (response && response.Success) {
                    getTree();
                }
            });
        };

        function init() {
            getTree();
        }

        init();
    }

    TreeController.$inject = ['$scope', '$mdDialog', 'TreeFactory', '$stateParams', '$filter'];

    app.controller('TreeController', TreeController);
})();
