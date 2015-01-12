(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function HeaderController($scope, $mdDialog) {
        var vm = this;

    }

    HeaderController.$inject = ['$scope', '$mdDialog'];

    app.controller('HeaderController', HeaderController);

})();
