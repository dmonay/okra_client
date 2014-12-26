(function () {
    'use strict';

    var app = angular.module('SharedFactories');

    function TreeFactory($http, okraAPI) {
        var TreeFactoryAPI = {
            getTrees: function (orgName) {
                var url = okraAPI.getTreesInOrg + orgName;
                return $http.get(url);
            },
            createTree: function (orgName, tree) {
                var url = okraAPI.createTree + orgName;
                return $http.post(url, {
                    treeName: tree.name,
                    timeframe: tree.timeframe,
                    userId: tree.userId,
                    username: tree.username
                });
            }
        };

        return TreeFactoryAPI;
    }

    TreeFactory.$inject = ['$http', 'okraAPI'];

    app.factory('TreeFactory', TreeFactory);

})();
