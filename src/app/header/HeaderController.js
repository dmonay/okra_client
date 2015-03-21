(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function HeaderController($scope, $mdDialog, session, $interval) {
        var vm = this;

        vm.session = session;
        vm.dropdownOpen = false;

    }

    HeaderController.$inject = ['$scope', '$mdDialog', 'session', '$interval'];

    app.controller('HeaderController', HeaderController);

})();
