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

        function getNodeIndex(array, id) {
            return _.findIndex(array, function (node) {
                return node.Id === id;
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
                if (response) {
                    var node = response.node,
                        parentNode = response.parentNode;

                    if (editMode) {
                        var objectiveIndex;
                        if (nodeType === 'Objective') {
                            objectiveIndex = getNodeIndex(vm.tree.Objectives, node.Id);
                            vm.tree.Objectives[objectiveIndex].Name = node.Name;
                            vm.tree.Objectives[objectiveIndex].Body = node.Body;
                            vm.tree.Objectives[objectiveIndex].Completed = node.Completed;
                        } else {
                            var keyResultIndex = getNodeIndex(parentNode.KeyResults, node.Id);
                            objectiveIndex = getNodeIndex(vm.tree.Objectives, parentNode.Id);
                            vm.tree.Objectives[objectiveIndex].KeyResults[keyResultIndex].Name =
                                node.Name;
                            vm.tree.Objectives[objectiveIndex].KeyResults[keyResultIndex].Body =
                                node.Body;
                            vm.tree.Objectives[objectiveIndex].KeyResults[keyResultIndex].Priority =
                                node.Priority;
                            vm.tree.Objectives[objectiveIndex].KeyResults[keyResultIndex].Completed =
                                node.Completed;
                        }
                    } else {
                        if (nodeType === 'Objective') {
                            node.KeyResults = [];
                            vm.tree.Objectives.push(node);
                        } else {
                            console.log(node);
                            vm.currentObjective.KeyResults.push(node);
                        }

                    }
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
