(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function AddOrganizationModalController($scope, OrganizationFactory, $modal) {
        var modal = this;


    }

    AddOrganizationModalController.$inject = ['$scope', 'OrganizationFactory'];

    app.controller('AddOrganizationModalController', AddOrganizationModalController);

})();
