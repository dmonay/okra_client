(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function HeaderController($scope, $mdDialog, hardCoded, session) {
        var vm = this;

        vm.userName = hardCoded.userName;
        vm.session = session.user;
    }

    HeaderController.$inject = ['$scope', '$mdDialog', 'hardCoded', 'session'];

    app.controller('HeaderController', HeaderController);

})();
