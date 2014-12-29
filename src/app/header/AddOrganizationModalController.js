(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function AddOrganizationModalController($scope, OrganizationFactory, $mdDialog) {
        var modal = this;

        modal.createOrganization = function (name) {
            modal.formSubmitted = true;
            if (modal.organizationForm.$valid) {
                OrganizationFactory.createOrganization(name).then(function (response) {
                    console.log(response);
                });
            }
        };
        modal.closeModal = function () {
            $mdDialog.hide();
        };
    }

    AddOrganizationModalController.$inject = ['$scope', 'OrganizationFactory', '$mdDialog'];

    app.controller('AddOrganizationModalController', AddOrganizationModalController);

})();
