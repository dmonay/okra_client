(function () {
    'use strict';

    var app = angular.module('SharedFactories');

    /**
     * @ngdoc service
     * @name SharedFactories.TreeFactory
     * @requires $http
     * @requires okra.okraAPI
     * @description
     *
     * # TreeFactory
     * Returns an object/objects containing tree data. Also has the ability to format trees for the ui.
     *
     */

    function TreeFactory($http, okraAPI) {
        var TreeFactoryAPI = {
            /**
             * @ngdoc method
             * @name getTrees
             * @description Gets a an array of trees.
             * @methodOf SharedFactories.TreeFactory
             * @param {string}
             *     OrgName The name of the organzation currently active/authorized.
             * @returns {array} An array of trees belonging to the organization.
             */
            getTrees: function (orgName) {
                var url = okraAPI.getTreesInOrg + orgName;
                return $http.get(url);
            },
            /**
             * @ngdoc method
             * @name getSingleTree
             * @description Gets a single tree object.
             * @methodOf SharedFactories.TreeFactory
             * @param {string}
             *     OrgName The name of the organzation currently active/authorized.
             * @param {string}
             *     TreeId The Id of the tree requested.
             *
             * @returns {object} An object containing objectives, key results and tasks assigned to the tree.
             */
            getSingleTree: function (orgName, treeId) {
                var url = okraAPI.getSingleTreeInOrg + orgName + '/' + treeId;
                return $http.get(url);
            },
            /**
             * @ngdoc method
             * @name createTree
             * @description Creates a new tree.
             * @methodOf SharedFactories.TreeFactory
             * @param {string}
             *     OrgName The name of the organzation that the tree is being added to.
             * @param {object}
             *     Tree Object containing a name, timeframe, userid and a username for the tree.
             * @returns {object} A response from the server containing a new tree.
             */
            createTree: function (orgName, tree) {
                var url = okraAPI.createTree + orgName;
                return $http.post(url, {
                    treeName: tree.name,
                    timeframe: tree.timeframe,
                    userId: tree.userId,
                    username: tree.username
                });
            },
            /**
             * @ngdoc method
             * @name updateMembers
             * @description Updates the members in a tree.
             * @methodOf SharedFactories.TreeFactory
             * @param {object}
             *     Tree The tree that the member is being added to.
             * @param {array}
             *     Members Array of members being added (doesn't have to include all members)
             * @returns {object} A response from the server containing a success message.
             */
            updateMembers: function (tree, members) {
                var url = okraAPI.updateMembers + tree.OrgName;
                return $http.post(url, {
                    updateTree: true,
                    treeName: tree.TreeName,
                    treeId: tree.Id,
                    members: members
                });
            },
            /**
             * @ngdoc method
             * @name createObjective
             * @description Adds Objective to the specified tree.
             * @methodOf SharedFactories.TreeFactory
             * @param {object}
             *     Tree The tree object that the objective is tied to (includes tree id, name and orgname).
             * @param {object}
             *     Objective Object containing the objective information (name, body, completion status, id, members)
             *
             * @returns {object} A response from the server.
             */
            createObjective: function (tree, objective) {
                var url = okraAPI.createObjective + tree.OrgName;
                return $http.post(url, {
                    id: objective.Id,
                    treeId: tree.Id,
                    name: objective.Name,
                    body: objective.Body,
                    completed: false,
                    members: objective.Members
                });
            },
            /**
             * @ngdoc method
             * @name updateObjective
             * @description Updates Objective of the specified tree.
             * @methodOf SharedFactories.TreeFactory
             * @param {object}
             *     Tree The tree object that the objective is tied to (includes tree id, name and orgname).
             * @param {object}
             *     Objective Object containing the objective information (name, body, completion status, id, members)
             *
             * @returns {object} A response from the server.
             */
            updateObjective: function (tree, objective) {
                var url = okraAPI.updateObjective + tree.OrgName + '/' + tree.Id + '/' + objective.Id;
                return $http.post(url, {
                    objName: objective.Name,
                    objbody: objective.Body,
                    completed: objective.Completed
                        // members: objective.Members
                });
            },
            /**
             * @ngdoc method
             * @name createKeyResult
             * @description Adds key result to the specified objective of the specified tree.
             * @methodOf SharedFactories.TreeFactory
             * @param {object}
             *     Tree The tree object that the key result is tied to (includes tree id, name and orgname).
             * @param {object}
             *     Objective Object containing the objective information (name, body, completion status, id, members)
             * @param {object}
             *     KeyResult Object containing the key result information (name, body, completion status, id, members)
             *
             * @returns {object} A response from the server.
             */
            createKeyResult: function (tree, keyResult, objective) {
                var url = okraAPI.createKeyResult + tree.OrgName + '/' + objective.Id;
                return $http.post(url, {
                    id: keyResult.Id,
                    treeId: tree.Id,
                    name: keyResult.Name,
                    body: keyResult.Body,
                    priority: keyResult.priority,
                    completed: false,
                    members: keyResult.Members
                });
            },
            /**
             * @ngdoc method
             * @name updateKeyResult
             * @description Updates Key Result of the specified tree and objective.
             * @methodOf SharedFactories.TreeFactory
             * @param {object}
             *     Tree The tree object that the objective is tied to (includes tree id, name and orgname).
             * @param {object}
             *     Objective Object containing the objective information (name, body, completion status, id, members)
             *
             * @returns {object} A response from the server.
             */
            updateKeyResult: function (tree, keyResult, objective) {
                var keyResultIndex = parseFloat(keyResult.Id[2]) - 1;
                var url = okraAPI.updateKeyResult + tree.OrgName + '/' + tree.Id + '/' + objective.Id +
                    '/' + keyResultIndex;
                return $http.post(url, {
                    krName: keyResult.Name,
                    krbody: keyResult.Body,
                    priority: keyResult.priority,
                    completed: keyResult.Completed,
                    // members: objective.Members
                });
            },
            /**
             * @ngdoc method
             * @name createTask
             * @description Adds a task to the specified key result of the specified tree.
             * @methodOf SharedFactories.TreeFactory
             * @param {object}
             *     Tree The tree object that the key result is tied to (includes tree id, name and orgname).
             * @param {object}
             *     Objective Object containing the objective information (name, body, completion status, id, members)
             * @param {object}
             *     KeyResult Object containing the key result information (name, body, completion status, id, members)
             *
             * @returns {object} A response from the server containing a new key result.
             */
            createTask: function (tree, task, objective, keyResult) {
                var keyResultIndex = parseFloat(keyResult.Id[2]) - 1;
                var url = okraAPI.createTask + tree.OrgName + '/' + objective.Id + '/' + keyResultIndex;
                return $http.post(url, {
                    id: task.Id,
                    treeId: tree.Id,
                    name: task.Name,
                    body: task.Body,
                    priority: task.priority,
                    completed: false,
                    members: task.Members
                });
            },
            /**
             * @ngdoc method
             * @name updateTask
             * @description Updates a task tied to the specified key result of the specified tree.
             * @methodOf SharedFactories.TreeFactory
             * @param {object}
             *     Tree The tree object that the key result is tied to (includes tree id, name and orgname).
             * @param {object}
             *     Objective Object containing the objective information (name, body, completion status, id, members)
             * @param {object}
             *     KeyResult Object containing the key result information (name, body, completion status, id, members)
             *
             * @returns {object} A response from the server containing a new key result.
             */
            updateTask: function (tree, task, objective, keyResult) {
                var keyResultIndex = parseFloat(keyResult.Id[2]) - 1,
                    taskIndex = parseFloat(task.Id[4]) - 1,
                    url = okraAPI.updateTask + tree.OrgName + '/' + tree.Id + '/' + objective.Id + '/' +
                    keyResultIndex + '/' + taskIndex;

                return $http.post(url, {
                    taskname: task.Name,
                    taskbody: task.Body,
                    priority: task.priority,
                    completed: task.Completed,
                    // members: task.Members
                });
            },
            /**
             * @ngdoc method
             * @name formatTrees
             * @description Creates a new member object.
             * @methodOf SharedFactories.TreeFactory
             * @param {array}
             *     Trees Array of objects that contains the tree information (TreeId, name and creator id)
             * @returns {array} An array of arrays containing a maximum of four tree objects per array.
             */
            formatTrees: function (trees) {
                var formattedTrees = [];
                var currentArray = [];

                _.forEach(trees, function (tree, index) {
                    if ((index + 1) % 4 === 0) {
                        currentArray.push(tree);
                        formattedTrees.push(currentArray);
                        currentArray = [];
                    } else {
                        currentArray.push(tree);
                    }

                    if (index + 1 === trees.length) {
                        formattedTrees.push(currentArray);
                    }
                });

                return formattedTrees;
            }
        };

        return TreeFactoryAPI;
    }

    TreeFactory.$inject = ['$http', 'okraAPI'];

    app.factory('TreeFactory', TreeFactory);

})();
