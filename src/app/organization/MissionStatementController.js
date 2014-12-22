(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function MissionStatementController($scope, $mdToast) {
        var vm = this;

        vm.closeToast = function () {
            $mdToast.hide();
        };
    }

    MissionStatementController.$inject = ['$scope', '$mdToast'];

    app.controller('MissionStatementController', MissionStatementController);

})();
