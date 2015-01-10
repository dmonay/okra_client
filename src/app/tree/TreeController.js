(function () {
    'use strict';

    var app = angular.module('TreeModule');

    function TreeController($scope, $mdDialog, TreeFactory) {
        var vm = this;

        vm.linkedNodeIds = ['organizationNode', 'objectiveNode', 'keyResultNode', 'taskNode'];

        vm.tree = {
            "orgName": "Creationary",
            "members": [{
                "userName": "Alap23",
                "userId": "fsdfdsfd8fds9f8ds8f7",
                "role": "employee"
            }, {
                "userName": "ItsTejababy",
                "userId": "fsdfdsfd8fds9f8ds8f7",
                "role": "employee"
            }, {
                "userName": "Ayrab",
                "userId": "fsdfdsfd8fds9f8ds8f7",
                "role": "admin"
            }, {
                "userName": "Swag",
                "userId": "fsdfdsfd8fds9f8ds8f7",
                "role": "admin"
            }],
            "active": true,
            "timeframe": "annual",
            "mission": "get money get paid",
            "objectives": [{
                "name": "High Priority",
                "users": [
                    "Ayrab$$$", "ItsTejababy"
                ],
                "key_results": [{
                    "users": [
                        "Ayrab$$$", "ItsTejababy"
                    ],
                    "name": "salary > 80K",
                    "body": "make sure you can pay the bills",
                    "completed": false,
                    "priority": "high",
                    "tasks": [{
                        "users": [
                            "ItsTejababy"
                        ],
                        "name": "Some events up in here",
                        "body": "go to 5 meetups",
                        "completed": false,
                        "priority": "high"
                    }, {
                        "users": [
                            "ItsTejababy"
                        ],
                        "name": "Make Bread",
                        "body": "go to 5 meetups",
                        "completed": false,
                        "priority": "high"
                    }]
                }]
            }, {
                "name": "Get Stuff done before Christmas",
                "users": [
                    "ItsTejababy"
                ],
                "key_results": [{
                    "users": [
                        "Ayrab$$$", "ItsTejababy"
                    ],
                    "name": "Networking",
                    "body": "make sure you can pay the bills",
                    "completed": false,
                    "priority": "high",
                    "tasks": [{
                        "users": [
                            "Ayrab$$$"
                        ],
                        "name": "Event 11/12/2015",
                        "body": "go to 5 meetups",
                        "completed": false,
                        "priority": "high"
                    }, {
                        "users": [
                            "Ayrab$$$"
                        ],
                        "name": "Do some cool stuff",
                        "body": "go to 5 meetups",
                        "completed": false,
                        "priority": "high"
                    }]
                }, {
                    "users": [
                        "Ayrab$$$", "ItsTejababy"
                    ],
                    "name": "salary > 80K",
                    "body": "make sure you can pay the bills",
                    "completed": false,
                    "priority": "high",
                    "tasks": [{
                        "users": [
                            "Ayrab$$$"
                        ],
                        "name": "Get Shit Done!",
                        "body": "go to 5 meetups",
                        "completed": false,
                        "priority": "high"
                    }]
                }]
            }]
        };

        vm.changeCurrentObjective = function (objective) {
            vm.currentObjective = objective;
        };

        vm.changeCurrentKeyResult = function (keyResult) {
            vm.currentKeyResult = keyResult;
        };

        vm.openMissionStatementModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/tree/mission-statement-modal.tpl.html',
                controller: 'MissionStatementModalController',
                controllerAs: 'modal',
                locals: {
                    missionStatement: vm.tree.mission
                }
            }).then(function (response) {
                vm.tree.mission = response;
            });
        };

    }

    TreeController.$inject = ['$scope', '$mdDialog', 'TreeFactory'];

    app.controller('TreeController', TreeController);

})();
