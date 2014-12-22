(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationController($scope, $mdDialog) {
        var vm = this;

        vm.missionStatement =
            'Monterey Bay Aquarium: The mission of the non-profit Monterey Bay Aquarium is to inspire conservation of the oceans.';

        vm.openMissionStatementModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/organization/mission-statement-modal.tpl.html',
                controller: 'MissionStatementModalController',
                controllerAs: 'modal',
                locals: {
                    missionStatement: vm.missionStatement
                }
            });
        };
    }

    OrganizationController.$inject = ['$scope', '$mdDialog'];

    app.controller('OrganizationController', OrganizationController);

})();
