(function () {
    'use strict';

    var app = angular.module('TreeModule');

    function TreeController($scope, $mdDialog, TreeFactory) {
        var vm = this;

        vm.missionStatement =
            'Monterey Bay Aquarium: The mission of the non-profit Monterey Bay Aquarium is to inspire conservation of the oceans.';

        vm.orgMembers = [{
            userName: "slacker",
            userId: "fsdfdsfd8fds9f8ds8f7",
            role: "boss"
        }, {
            userName: "pdiddy",
            userId: "fsdfdsasdasd9f8ds8f7",
            role: "denizen"
        }];

        vm.linkedNodeIds = ['organizationNode', 'objectiveNode', 'keyResultNode', 'taskNode'];

        vm.openMissionStatementModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/shared/mission-statement-modal.tpl.html',
                controller: 'MissionStatementModalController',
                controllerAs: 'modal',
                locals: {
                    missionStatement: vm.missionStatement
                }
            }).then(function (response) {
                vm.missionStatement = response;
            });
        };

    }

    TreeController.$inject = ['$scope', '$mdDialog', 'TreeFactory'];

    app.controller('TreeController', TreeController);

})();