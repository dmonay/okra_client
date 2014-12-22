(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function MissionStatementModalController($scope, OrganizationFactory, $mdDialog, missionStatement) {
        var modal = this;

        modal.missionStatement = missionStatement;

        modal.saveMissionStatement = function() {
            modal.formSubmitted = true;
            if(modal.missionStatementForm.$valid) {

            }
        };

        modal.closeModal = function () {
            $mdDialog.hide();
        };
    }

    MissionStatementModalController.$inject = ['$scope', 'OrganizationFactory', '$mdDialog', 'missionStatement'];

    app.controller('MissionStatementModalController', MissionStatementModalController);

})();
