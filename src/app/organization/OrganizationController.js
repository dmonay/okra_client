(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationController($scope, $mdToast) {
        var vm = this;

        vm.openMissionStatement = function ($event) {
            $mdToast.show({
                controller: 'MissionStatementController',
                controllerAs: 'toast',
                templateUrl: 'app/organization/mission-statement-toast.tpl.html',
                hideDelay: 0,
                position: 'bottom right'
            });
        };
    }

    OrganizationController.$inject = ['$scope', '$mdToast'];

    app.controller('OrganizationController', OrganizationController);

})();
