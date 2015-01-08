(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationMembersModalController($scope, OrganizationFactory, $mdDialog, members, MemberService,
        hardCoded) {
        var modal = this;

        modal.members = members;

        modal.newUser = {};

        modal.addMember = function () {
            modal.formSubmitted = true;
            if (modal.newMemberForm.$valid) {
                modal.currentlySaving = true;
                var newMembersArray = [];

                var newMember = MemberService.createUser(modal.newUser.name, modal.newUser.role);

                newMembersArray.push(newMember);

                OrganizationFactory.updateMembers(hardCoded.org, newMembersArray).then(function (response) {
                    modal.currentlySaving = false;
                    modal.formSubmitted = false;
                });
            }
        };

        modal.closeModal = function () {
            $mdDialog.hide(modal.members);
        };
    }

    OrganizationMembersModalController.$inject = ['$scope', 'OrganizationFactory', '$mdDialog', 'members',
        'MemberService', 'hardCoded'
    ];

    app.controller('OrganizationMembersModalController', OrganizationMembersModalController);

})();
