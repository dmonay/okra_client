(function () {
    'use strict';

    var app = angular.module('TreeModule');

    function NodeModalDashboardController($scope, TreeFactory, $mdDialog, editMode, nodeType, node) {
        var modal = this;

        modal.name = editMode ? node.Name : nodeType;

        modal.formSubmitted = false;

        modal.createNode = function () {
            console.log('needs logic');
            modal.formSubmitted = true;
        };

        modal.closeModal = function () {
            $mdDialog.hide();
        };
    }

    NodeModalDashboardController.$inject = ['$scope', 'TreeFactory', '$mdDialog', 'editMode', 'nodeType', 'node'];

    app.controller('NodeModalDashboardController', NodeModalDashboardController);

})();
