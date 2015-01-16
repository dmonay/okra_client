(function () {
    'use strict';

    var app = angular.module('TreeModule');

    function NodeModalDashboardController($scope, TreeFactory, $mdDialog, editMode, nodeType, node, tree,
        parentNode) {
        var modal = this;

        modal.editMode = editMode;
        modal.nodeType = nodeType;
        modal.name = editMode ? node.Name : nodeType;
        modal.formSubmitted = false;
        modal.members = angular.copy(tree.Members);
        modal.node = node;

        if (nodeType === 'Objective') {
            modal.node.Id = 'obj' + (tree.Objectives.length + 1);
        }
        if (nodeType === 'Key Result') {
            modal.node.Id = 'kr' + (parentNode.KeyResults.length + 1);
            modal.node.priority = node.Priority ? node.Priority : 'Low';
        }

        if (!editMode) {
            modal.node.Members = [];
        } else {
            _.each(modal.members, function (member, index) {
                if (modal.node.Members[index] && modal.node.Members[index].userName === member.userName) {
                    member.isChecked = true;
                }
            });
        }

        modal.createNode = function () {
            modal.formSubmitted = true;

            if (modal.nodeForm.$valid) {
                var apiMethod = 'create' + nodeType.replace(' ', '');
                TreeFactory[apiMethod](tree, node, parentNode)
                    .then(function (response) {
                        if (response.data.Success) {
                            $mdDialog.hide(response.data);
                        }
                    });
            }
        };

        modal.addMember = function (member, added) {
            if (added) {
                node.Members.push(member);
            } else {
                node.Members = _.reject(node.Members, function (singleMember) {
                    return singleMember === member;
                });
            }
        };

        modal.closeModal = function () {
            $mdDialog.hide();
        };
    }

    NodeModalDashboardController.$inject = ['$scope', 'TreeFactory', '$mdDialog', 'editMode', 'nodeType', 'node',
        'tree', 'parentNode'
    ];

    app.controller('NodeModalDashboardController', NodeModalDashboardController);
})();
