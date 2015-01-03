(function () {
    'use strict';

    var app = angular.module('SharedServices');
    /**
     * @ngdoc service
     * @name SharedServices.MemberService
     * @description
     *
     * # MemberService
     * Interacts with member data.
     *
     */

    function MemberService() {

        /**
         * @ngdoc method
         * @name createUser
         * @description Creates a new member object.
         * @methodOf SharedServices.MemberService
         * @param {string}
         *     username for the new member.
         * @param {string}
         *     role for the new member.
         * @returns {Object} An object containing a username and a role for that member.
         */

        function Member(username, role) {
            this.userName = username;
            this.role = role;
        }

        var memberService = {
            createUser: function (username, role) {
                return new Member(username, role);
            }

        };

        return memberService;
    }

    // MemberService.$inject = [];

    app.factory('MemberService', MemberService);

})();
