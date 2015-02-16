(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function HeaderController($scope, $mdDialog, hardCoded) {
        var vm = this;

        vm.userName = hardCoded.userName;
    }

    HeaderController.$inject = ['$scope', '$mdDialog', 'hardCoded'];

    app.controller('HeaderController', HeaderController);

})();
