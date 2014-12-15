(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function AddOrganizationModalController($scope, OrganizationFactory, $modalInstance) {
        var modal = this;

        modal.createOrganization = function (name) {
            if (modal.organizationForm.$valid) {
                OrganizationFactory.createOrganization(name).then(function (response) {
                    console.log(response);
                });
            }
        };
        modal.closeModal = function () {
            $modalInstance.close();
        };
    }

    AddOrganizationModalController.$inject = ['$scope', 'OrganizationFactory', '$modalInstance'];

    app.controller('AddOrganizationModalController', AddOrganizationModalController);

})();
