(function () {
    'use strict';

    var app = angular.module('SharedFactories');

    function OrganizationFactory($http, okraAPI) {
        var organizationAPI = {
            createOrganization: function (orgName) {
                return $http.post(okraAPI.createOrg, {
                    organization: orgName,
                    userId: "548e3feebee23fc7375b788b"
                });
            },
            updateMission: function (orgName, mission) {
                var url = okraAPI.updateMission + orgName;
                return $http.post(url, {
                    mission: mission
                });
            },
            updateMembers: function (orgName, members) {
                var url = okraAPI.updateMembers + orgName;
                return $http.post(url, {
                    "members": members
                });
            }
        };

        return organizationAPI;
    }

    OrganizationFactory.$inject = ['$http', 'okraAPI'];

    app.factory('OrganizationFactory', OrganizationFactory);

})();
