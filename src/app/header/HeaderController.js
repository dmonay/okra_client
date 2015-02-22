(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function HeaderController($scope, $mdDialog, hardCoded, session, $interval) {
        var vm = this;

        vm.userName = hardCoded.userName;
        vm.session = session;
    }

    HeaderController.$inject = ['$scope', '$mdDialog', 'hardCoded', 'session', '$interval'];

    app.controller('HeaderController', HeaderController);

})();
