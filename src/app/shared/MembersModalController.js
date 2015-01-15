(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function MembersModalController($scope, apiFactory, $mdDialog, members, MemberService, node) {
        var modal = this;

        modal.members = members;

        modal.newUser = {
            role: "member"
        };

        modal.addMember = function () {
            modal.formSubmitted = true;
            if (modal.newMemberForm.$valid) {
                modal.currentlySaving = true;
                var newMembersArray = [];

                var newMember = MemberService.createUser(modal.newUser.name, modal.newUser.role);

                newMembersArray.push(newMember);

                apiFactory.updateMembers(node, newMembersArray).then(function (response) {
                    modal.currentlySaving = false;
                    modal.formSubmitted = false;
                    $mdDialog.hide(newMember);
                });
            }
        };

        modal.closeModal = function () {
            $mdDialog.hide();
        };
    }

    MembersModalController.$inject = ['$scope', 'apiFactory', '$mdDialog', 'members',
        'MemberService', 'node'
    ];

    app.controller('MembersModalController', MembersModalController);

})();
