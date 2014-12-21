(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function HeaderController($scope, $mdDialog) {
        var vm = this;

        vm.addOrganization = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/header/add-organization-modal.tpl.html',
                controller: 'AddOrganizationModalController',
                controllerAs: 'modal'
            });
        };
    }

    HeaderController.$inject = ['$scope', '$mdDialog'];

    app.controller('HeaderController', HeaderController);

})();
