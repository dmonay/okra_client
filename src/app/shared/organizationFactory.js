(function () {
    'use strict';

    var app = angular.module('SharedFactories');

    function OrganizationFactory($http, okraAPI, hardCoded) {
        var organizationAPI = {
            createOrganization: function (orgName) {
                return $http.post(okraAPI.createOrg, {
                    organization: orgName,
                    userId: hardCoded.userId
                });
            },
            updateMission: function (orgName, mission) {
                var url = okraAPI.updateMission + orgName;
                return $http.post(url, {
                    mission: mission,
                    treeId: '549dcbe9efb6f7204b000001'
                });
            },
            updateMembers: function (orgName, members) {
                var url = okraAPI.updateMembers + orgName;
                return $http.post(url, {
                    updateTree: false,
                    members: members
                });
            }
        };

        return organizationAPI;
    }

    OrganizationFactory.$inject = ['$http', 'okraAPI'];

    app.factory('OrganizationFactory', OrganizationFactory);

})();
