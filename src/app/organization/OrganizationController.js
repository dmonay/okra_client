(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationController($scope, $modal) {
        var vm = this;
    }

    OrganizationController.$inject = ['$scope', '$modal'];

    app.controller('OrganizationController', OrganizationController);

})();
