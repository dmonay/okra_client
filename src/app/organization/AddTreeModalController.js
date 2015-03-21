(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function AddTreeModalController($scope, TreeFactory, $mdDialog, session, organization) {
        var modal = this;

        modal.timeframe = 'monthly';
        modal.formSubmitted = false;

        modal.addTree = function () {
            modal.formSubmitted = true;
            if (modal.addTreeForm.$valid) {
                modal.currentlySaving = true;

                var tree = {
                    name: modal.newTreeName,
                    timeframe: modal.timeframe,
                    userId: session.user._id,
                    username: session.user.username
                };

                TreeFactory.createTree(organization, tree)
                    .then(function (response) {
                        modal.currentlySaving = false;
                        modal.formSubmitted = false;
                        $mdDialog.hide(response.data);
                    });
            }
        };

        modal.closeModal = function () {
            $mdDialog.hide();
        };
    }

    AddTreeModalController.$inject = ['$scope', 'TreeFactory', '$mdDialog', 'session', 'organization'];

    app.controller('AddTreeModalController', AddTreeModalController);

})();
