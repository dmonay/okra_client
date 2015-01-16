(function () {
    'use strict';

    var app = angular.module('TreeModule');

    function NodeModalDashboardController($scope, TreeFactory, $mdDialog, editMode, nodeType, node, tree) {
        var modal = this;

        modal.name = editMode ? node.Name : nodeType;

        modal.formSubmitted = false;

        modal.members = angular.copy(tree.Members);

        modal.node = node;
        modal.node.members = [];

        modal.createNode = function () {
            modal.formSubmitted = true;

            if (modal.nodeForm.$valid) {
                modal.node.id = 'obj' + (tree.Objectives.length + 1);
                var apiMethod = 'create' + nodeType;
                TreeFactory[apiMethod](tree, node)
                    .then(function (response) {
                        if (response.data.Success) {
                            $mdDialog.hide(response.data.Success);
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
        'tree'
    ];

    app.controller('NodeModalDashboardController', NodeModalDashboardController);
})();
