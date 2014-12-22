(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function MissionStatementModalController($scope, OrganizationFactory, $mdDialog, missionStatement) {
        var modal = this;

        modal.missionStatement = missionStatement;
        modal.formSubmitted = false;

        modal.saveMissionStatement = function () {
            modal.formSubmitted = true;
            console.log(modal.formSubmitted);
            if (modal.missionStatementForm.$valid) {

            }
        };

        modal.closeModal = function () {
            $mdDialog.hide();
        };
    }

    MissionStatementModalController.$inject = ['$scope', 'OrganizationFactory', '$mdDialog', 'missionStatement'];

    app.controller('MissionStatementModalController', MissionStatementModalController);

})();
