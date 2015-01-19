(function () {
    'use strict';

    var app = angular.module('TreeModule');

    function NodeModalDashboardController($scope, TreeFactory, $mdDialog, editMode, nodeType, node, tree,
        parentNode, secondaryParentNode) {
        var modal = this;
        var secondParentNode;
        modal.editMode = editMode;
        modal.nodeType = nodeType;
        modal.name = editMode ? node.Name : nodeType;
        modal.formSubmitted = false;
        modal.members = angular.copy(tree.Members);
        modal.node = angular.copy(node);

        if (!editMode) {
            modal.node.Members = [];

            if (nodeType === 'Objective') {
                modal.node.Id = 'obj' + (tree.Objectives.length + 1);
            }
            if (nodeType === 'Key Result') {
                modal.node.Id = 'kr' + (parentNode.KeyResults.length + 1);
            }
            if (nodeType === 'Task') {
                modal.node.Id = 'task' + (secondaryParentNode.Tasks.length + 1);
                secondParentNode = secondaryParentNode;
            }
        } else {
            _.each(modal.members, function (member, index) {
                if (modal.node.Members[index] && modal.node.Members[index].userName === member.userName) {
                    member.isChecked = true;
                }
            });
        }

        if (nodeType === 'Key Result' || nodeType === 'Task') {
            modal.node.Priority = node.Priority ? node.Priority : 'Low';
        }

        modal.createNode = function () {
            modal.formSubmitted = true;

            if (modal.nodeForm.$valid) {
                var apiMethod = 'create' + nodeType.replace(' ', '');
                TreeFactory[apiMethod](tree, modal.node, parentNode, secondParentNode)
                    .then(function (response) {
                        if (response.data.Success) {
                            $mdDialog.hide({
                                node: modal.node,
                                parentNode: parentNode
                            });
                        }
                    });
            }
        };

        modal.updateNode = function () {
            modal.formSubmitted = true;

            if (modal.nodeForm.$valid) {
                var apiMethod = 'update' + nodeType.replace(' ', '');
                TreeFactory[apiMethod](tree, modal.node, parentNode)
                    .then(function (response) {
                        if (response.data.Success) {
                            $mdDialog.hide({
                                node: modal.node,
                                parentNode: parentNode
                            });
                        }
                    });
            }
        };

        modal.addMember = function (member, added) {
            if (added) {
                modal.node.Members.push(member);
            } else {
                modal.node.Members = _.reject(node.Members, function (singleMember) {
                    return singleMember === member;
                });
            }
        };

        modal.closeModal = function () {
            $mdDialog.hide();
        };
    }

    NodeModalDashboardController.$inject = ['$scope', 'TreeFactory', '$mdDialog', 'editMode', 'nodeType', 'node',
        'tree', 'parentNode', 'secondaryParentNode'
    ];

    app.controller('NodeModalDashboardController', NodeModalDashboardController);
})();
