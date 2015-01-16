(function () {
    'use strict';

    var app = angular.module('TreeModule');

    function NodeModalDashboardController($scope, TreeFactory, $mdDialog, editMode, nodeType, node, tree,
        parentNode) {
        var modal = this;

        modal.nodeType = nodeType;
        modal.name = editMode ? node.Name : nodeType;
        modal.formSubmitted = false;
        modal.members = angular.copy(tree.Members);
        modal.node = node;
        modal.node.members = [];

        if (nodeType === 'Objective') {
            modal.node.id = 'obj' + (tree.Objectives.length + 1);
        }
        if (nodeType === 'Key Result') {
            modal.node.id = 'kr' + (parentNode.KeyResults.length + 1);
            modal.node.priority = 'Low';
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
                node.members.push(member);
            } else {
                node.members = _.reject(node.members, function (singleMember) {
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
