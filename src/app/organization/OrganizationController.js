(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationController($scope) {
        var vm = this;
    }

    OrganizationController.$inject = ['$scope'];

    app.controller('OrganizationController', OrganizationController);

})();
