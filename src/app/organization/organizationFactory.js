(function () {
    'use strict';

    var app = angular.module('SharedFactories');
    /**
     * @ngdoc service
     * @name SharedFactories.OrganizationFactory
     * @description
     *
     * # OrganizationFactory
     * A factory that holds methods that interact with the backend API, specifically organization data endpoints.
     *
     */

    function OrganizationFactory($http, okraAPI, session) {

        var organizationAPI = {
            /**
             * @ngdoc method
             * @name createOrganization
             * @description Creates a new organization.
             * @methodOf SharedFactories.OrganizationFactory
             * @param {string}
             *     orgName Name of the organization being created.
             * @returns {Object} An HTTP promise.
             */
            createOrganization: function (orgName) {
                return $http.post(okraAPI.createOrg, {
                    organization: orgName,
                    userId: session.user._id
                });
            },
            /**
             * @ngdoc method
             * @name updateMission
             * @description Updates the mission for that organization.
             * @methodOf SharedFactories.OrganizationFactory
             * @param {string}
             *     orgName Name of the organization being updated.
             * @param {string}
             *     mission The new mission statement for the organization.
             * @returns {Object} An HTTP promise.
             */
            updateMission: function (orgName, mission) {
                var url = okraAPI.updateMission + orgName;
                return $http.post(url, {
                    mission: mission,
                    treeId: '549dcbe9efb6f7204b000001'
                });
            },
            /**
             * @ngdoc method
             * @name updateMembers
             * @description Updates the members that are part of the organization.
             * @methodOf SharedFactories.OrganizationFactory
             * @param {string}
             *     orgName Name of the organization being updated.
             * @param {array}
             *     members An array of objects that contain member information such as role and username.
             * @returns {Object} An HTTP promise.
             */
            updateMembers: function (orgName, members) {
                var url = okraAPI.updateMembers + orgName;
                return $http.post(url, {
                    updateTree: false,
                    members: members
                });
            },
            /**
             * @ngdoc method
             * @name getOrganizations
             * @description Updates the members that are part of the organization.
             * @methodOf SharedFactories.OrganizationFactory
             * @param {string}
             *     userId Id of the user that is tied to the organizations
             * @returns {Object} An HTTP promise.
             */
            getOrganizations: function (userId) {
                var url = okraAPI.getOrganizations + userId;
                return $http.get(url);
            }
        };

        return organizationAPI;
    }

    OrganizationFactory.$inject = ['$http', 'okraAPI', 'session'];

    app.factory('OrganizationFactory', OrganizationFactory);

})();
