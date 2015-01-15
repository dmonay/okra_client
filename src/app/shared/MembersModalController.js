(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function MembersModalController($scope, apiFactory, $mdDialog, members, MemberService, organization) {
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

                apiFactory.updateMembers(organization, newMembersArray).then(function (response) {
                    modal.currentlySaving = false;
                    modal.formSubmitted = false;
                });
            }
        };

        modal.closeModal = function () {
            $mdDialog.hide(modal.members);
        };
    }

    MembersModalController.$inject = ['$scope', 'apiFactory', '$mdDialog', 'members',
        'MemberService', 'organization'
    ];

    app.controller('MembersModalController', MembersModalController);

})();
