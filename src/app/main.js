(function () {
    'use strict';

    //Define high level modules
    angular.module('SharedFactories', []);
    angular.module('HeaderModule', []);
    angular.module('OrganizationModule', []);
    angular.module('SharedServices', []);
    angular.module('SharedDirectives', []);

    var appDependencies = [
        'ui.router',
        'ngAnimate',
        'ngAria',
        'ngMaterial',
        'okra.templates',
        'HeaderModule',
        'SharedFactories',
        'SharedServices',
        'SharedDirectives',
        'OrganizationModule',
        'okra.routes'
    ];

    var app = angular.module('okra', appDependencies);

    //Manual Bootstrap
    angular.element(document).ready(function () {
        if (document.body.className.indexOf('ng-app') === -1) {
            angular.bootstrap(document, ['okra']);
            document.body.className = document.body.className + ' ng-app';
        }
    });

    /**
     * Theme Configuration
     */
    app.config(function ($mdThemingProvider) {
        $mdThemingProvider.setDefaultTheme('okra');
    });

    //Constants
    /**
     * @ngdoc service
     * @name okra.okraAPI
     * @description
     *
     * # okraAPI
     * An object containing all the endpoints for the restless backend.
     *
     */
    app.constant('okraAPI', {
        createOrg: 'http://localhost:8080/create/organization',
        updateMission: 'http://localhost:8080/update/mission/',
        updateMembers: 'http://localhost:8080/update/members/',
        createTree: 'http://localhost:8080/create/tree/',
        getTreesInOrg: 'http://localhost:8080/get/trees/',
        getSingleTreeInOrg: 'http://localhost:8080/get/trees/' //ORG/TREEID
    });

    app.constant('hardCoded', {
        userId: '5491e2aebee23fc7375b789c',
        userName: 'john234',
        org: 'someorg'
    });
})();

(function () {
    'use strict';

    var router = angular.module('okra.routes', ['ui.router']);

    /**
     * @ngdoc service
     * @name uiRouter.states
     * @description
     *
     * # Routes
     * A set of front end states/routes that were created by ui-router.
     *
     */

    router.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
        /**
         * @ngdoc method
         * @name login
         * @description Route for logging in to the app.
         * @methodOf uiRouter.states
         * @param {string}
         *     url /login
         */
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.tpl.html',
                // controller: 'LoginController as vm'
            })
            /**
             * @ngdoc method
             * @name organization/tree
             * @description Route for interacting with / viewing a single tree.
             * @methodOf uiRouter.states
             * @param {string}
             *     url /organization/:organization/tree/:treeId
             */
            .state('organization/tree', {
                url: '/organization/:organization/tree/:treeId',
                templateUrl: 'app/tree/tree.tpl.html',
                controller: 'OrganizationController as vm'
            })
            /**
             * @ngdoc method
             * @name organization
             * @description Route for interacting with / viewing all the trees in an organization.
             * @methodOf uiRouter.states
             * @param {string}
             *     url /organization/:organization/trees
             */
            .state('organization', {
                url: '/organization/:organization/trees',
                templateUrl: 'app/organization/organization-trees-selection.tpl.html',
                controller: 'OrganizationController as vm'
            });
    });
})();

(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function AddOrganizationModalController($scope, OrganizationFactory, $mdDialog) {
        var modal = this;

        modal.createOrganization = function (name) {
            modal.formSubmitted = true;
            if (modal.organizationForm.$valid) {
                OrganizationFactory.createOrganization(name).then(function (response) {
                    console.log(response);
                });
            }
        };
        modal.closeModal = function () {
            $mdDialog.hide();
        };
    }

    AddOrganizationModalController.$inject = ['$scope', 'OrganizationFactory', '$mdDialog'];

    app.controller('AddOrganizationModalController', AddOrganizationModalController);

})();

(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function HeaderController($scope, $mdDialog) {
        var vm = this;

        vm.addOrganization = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/header/add-organization-modal.tpl.html',
                controller: 'AddOrganizationModalController',
                controllerAs: 'modal'
            });
        };
    }

    HeaderController.$inject = ['$scope', '$mdDialog'];

    app.controller('HeaderController', HeaderController);

})();

(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function MissionStatementModalController($scope, OrganizationFactory, $mdDialog, missionStatement, hardCoded) {
        var modal = this;

        modal.missionStatement = missionStatement;
        modal.formSubmitted = false;

        modal.saveMissionStatement = function () {
            modal.formSubmitted = true;
            if (modal.missionStatementForm.$valid) {
                modal.currentlySaving = true;
                OrganizationFactory.updateMission(hardCoded.org, modal.newMissionStatement)
                    .then(function (response) {
                        modal.currentlySaving = false;
                        modal.formSubmitted = false;
                        $mdDialog.hide(response.data);
                    });
            }
        };

        modal.closeModal = function () {
            $mdDialog.hide();
        };
    }

    MissionStatementModalController.$inject = ['$scope', 'OrganizationFactory', '$mdDialog', 'missionStatement',
        'hardCoded'
    ];

    app.controller('MissionStatementModalController', MissionStatementModalController);

})();

(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationController($scope, $mdDialog, TreeFactory) {
        var vm = this;

        vm.missionStatement =
            'Monterey Bay Aquarium: The mission of the non-profit Monterey Bay Aquarium is to inspire conservation of the oceans.';

        vm.orgMembers = [{
            userName: "slacker",
            userId: "fsdfdsfd8fds9f8ds8f7",
            role: "boss"
        }, {
            userName: "pdiddy",
            userId: "fsdfdsasdasd9f8ds8f7",
            role: "denizen"
        }];

        vm.linkedNodeIds = ['organizationNode', 'objectiveNode', 'keyResultNode', 'taskNode'];

        //Waiting to fix issue with backend get request CORS
        // TreeFactory.getTrees('someorg').then(function (reponse) {
        //     console.log(response);
        // });

        vm.trees = [{
            "Name": "Monthly 12/14",
            "Id": "549dcb2befb6f7203e000001",
            "Active": true
        }, {
            "Name": "yearly 12/14",
            "Id": "549dcbe9efb6f7204b000001",
            "Active": true
        }, {
            "Name": "Make bread",
            "Id": "549dcbf2efb6f7204b000002",
            "Active": true
        }, {
            "Name": "Monthly 12/14",
            "Id": "549dcb2befb6f7203e000001",
            "Active": true
        }, {
            "Name": "yearly 12/14",
            "Id": "549dcbe9efb6f7204b000001",
            "Active": true
        }];

        vm.formattedTrees = TreeFactory.formatTrees(vm.trees);

        vm.openMissionStatementModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/organization/mission-statement-modal.tpl.html',
                controller: 'MissionStatementModalController',
                controllerAs: 'modal',
                locals: {
                    missionStatement: vm.missionStatement
                }
            }).then(function (response) {
                vm.missionStatement = response;
            });
        };

        vm.openOrganizationMembersModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/organization/organization-members-modal.tpl.html',
                controller: 'OrganizationMembersModalController',
                controllerAs: 'modal',
                locals: {
                    members: vm.orgMembers
                }
            }).then(function (response) {
                vm.orgMembers = response;
            });
        };

        vm.openAddTreeModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/tree/add-tree-modal.tpl.html',
                controller: 'AddTreeModalController',
                controllerAs: 'modal'
            }).then(function (response) {
                if (response) {
                    vm.trees.push(response);
                    vm.formattedTrees = TreeFactory.formatTrees(vm.trees);
                }
            });
        };
    }

    OrganizationController.$inject = ['$scope', '$mdDialog', 'TreeFactory'];

    app.controller('OrganizationController', OrganizationController);

})();

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
        'MemberService'
    ];

    app.controller('OrganizationMembersModalController', OrganizationMembersModalController);

})();

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

    function OrganizationFactory($http, okraAPI, hardCoded) {

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
                    userId: hardCoded.userId
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
            }
        };

        return organizationAPI;
    }

    OrganizationFactory.$inject = ['$http', 'okraAPI', 'hardCoded'];

    app.factory('OrganizationFactory', OrganizationFactory);

})();

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

(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name SharedDirectives.directive:ok-collapse
     * @restrict A
     *
     * @description
     * @param {string} linked-to Required by the directive to know which container/node it is linked to
     * @param {binding} all-linked-nodes Array required by the directive to keep track of all collapsable units
     *
     * @usage
     * <button ok-collapse linked-to="uniqueId" all-linked-nodes="['uniqueIdOne', 'uniqueIdTwo']"></button>
     *<div id="uniqueIdOne"></div>
     *<div id="uniqueIdTwo"></div>
     */

    var app = angular.module('SharedDirectives');

    function okCollapse($animate) {
        return {
            restrict: 'A',
            link: linkFunc,
            scope: {
                linkedTo: '@',
                allLinkedNodes: '='
            }
        };

        function linkFunc(scope, iElement, iAttrs) {
            var thisNode = angular.element(document.getElementById(scope.linkedTo)),
                allNodes = scope.allLinkedNodes;

            iElement.bind('click', function () {
                var isCollapsed = thisNode.next().hasClass('collapse');
                //hide all nodes beneath the node we chose
                var node,
                    i = allNodes.indexOf(scope.linkedTo) + 1;
                for (i; i < allNodes.length; i++) {
                    node = angular.element(document.getElementById(allNodes[i]));
                    if (allNodes[i] !== scope.linkedTo && !isCollapsed) {
                        $animate.addClass(node, 'collapse');
                    }
                    if (isCollapsed) {
                        $animate.removeClass(node, 'collapse');
                        i = allNodes.length;
                    }
                    if (iElement.hasClass('md-warn')) {
                        $animate.addClass(node, 'collapse');
                        $animate.removeClass(thisNode.next(), 'collapse');
                    }
                    scope.$apply();
                }
            });
        }
    }

    okCollapse.$inject = ['$animate'];

    app.directive('okCollapse', okCollapse);

})();

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

(function () {
    'use strict';

    var app = angular.module('SharedDirectives');

    /**
     * @ngdoc directive
     * @name SharedDirectives.directive:ok-toggle-color
     * @restrict A
     * @requires SharedDirectives.directive:ok-collapse
     *
     * @description
     * `ok-toggle-color`
     *
     *  Added to an element that has an ok-collapse attribute attached to it. Requires the same attributes as ok-collapse.
     *  Toggles primary to warning color and minus to plus classes (font awesome).
     * @usage
     * <button ok-collapse ok-toggle-color linked-to="uniqueId" all-linked-nodes="['uniqueIdOne', 'uniqueIdTwo']">
     *  <i class="fa fa-plus"></i>
     *</button>
     *<div id="uniqueIdOne"></div>
     *<div id="uniqueIdTwo"></div>
     */

    function okToggleColor() {
        return {
            restrict: 'A',
            link: linkFunc
        };

        function linkFunc(scope, iElement, iAttrs) {
            var collapseScope = iElement.isolateScope();

            function replaceClass(oldClass, newClass, element) {
                element.addClass(newClass);
                element.removeClass(oldClass);
            }

            function resetAllButtons(iconElements, buttonElement) {
                var i;
                for (i = 0; i < iconElements.length; i++) {
                    var currentElement = angular.element(iconElements[i]);
                    if (currentElement.hasClass('fa') && !currentElement.hasClass('fa-pencil')) {
                        replaceClass('fa-minus', 'fa-plus', currentElement);
                        currentElement.parent().removeClass('md-warn');
                        currentElement.parent().removeClass('md-primary');
                    }
                }
            }

            function disableChildren(collapseScope, thisElement) {
                var allNodes = collapseScope.allLinkedNodes,
                    i = allNodes.indexOf(collapseScope.linkedTo);
                for (i; i < allNodes.length; i++) {
                    var node = angular.element(document.getElementById(allNodes[i]));

                    node.children().removeClass('active');

                    resetAllButtons(node.find('a').find('i'), node.find('a'));
                }

                thisElement.addClass('active');
            }

            iElement.bind('click', function () {
                //is toggled open
                if (iElement.hasClass('md-warn')) {
                    disableChildren(collapseScope, iElement.parent().parent());
                    replaceClass('fa-minus', 'fa-plus', iElement.find('i'));
                    replaceClass('md-warn', 'md-primary', iElement);
                }
                //is toggled closed 
                else if (iElement.hasClass('md-primary')) {
                    replaceClass('fa-plus', 'fa-minus', iElement.find('i'));
                    replaceClass('md-primary', 'md-warn', iElement);
                }
                //hasn't been toggled 
                else {
                    disableChildren(collapseScope, iElement.parent().parent());
                    replaceClass('fa-plus', 'fa-minus', iElement.find('i'));
                    iElement.addClass('md-warn');
                }
            });
        }
    }

    // okToggleColor.$inject = [];

    app.directive('okToggleColor', okToggleColor);

})();

angular.module('okra.templates', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put("app/header/add-organization-modal.tpl.html",
        "<md-dialog flex=\"30\"><div layout=\"row\" layout-align=\"center\"><md-subheader><h3>Add An Organization</h3></md-subheader></div><md-content><div layout=\"row\" layout-align=\"center\"><form class=\"form-horizontal\" name=\"modal.organizationForm\"><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-input-group class=\"long\"><label>Organization Name</label><md-input required name=\"organizationName\" ng-model=\"modal.organizationName\" autocapitalize=\"off\"></md-input></md-input-group></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"modal.formSubmitted && modal.organizationForm.organizationName.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div></form></div><md-content><div class=\"md-actions\" layout=\"row\" layout-align=\"center end\"><md-button class=\"md-raised md-warn\" ng-click=\"modal.closeModal()\" aria-label=\"cancel\">Cancel</md-button><md-button class=\"md-raised md-primary\" ng-click=\"modal.createOrganization(modal.organizationName)\" aria-label=\"add\">Add</md-button></div><md-dialog></md-dialog></md-content></md-content></md-dialog>"
    );
    $templateCache.put("app/login/login.tpl.html",
        "<div class=\"green-overlay\" layout=\"column\" layout-align=\"center center\" flex=\"100\"><div layout=\"row\" layout-align=\"center center\"><h1>Login</h1></div><div class=\"well\" layout=\"row\" layout-align=\"center center\"><form name=\"vm.userLoginForm\"><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"center center\"><md-input-group class=\"long\"><label>Username</label><md-input required name=\"username\" ng-model=\"username\" autocapitalize=\"off\"></md-input></md-input-group></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"vm.formSubmitted && vm.userLoginForm.username.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-input-group class=\"long\"><label>Password</label><md-input required name=\"password\" ng-model=\"vm.password\" autocapitalize=\"off\"></md-input></md-input-group></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"vm.formSubmitted && vm.userLoginForm.password.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div><div class=\"md-actions-form\" layout=\"row\" layout-align=\"center center\"><md-button class=\"md-raised\" ng-click=\"optionsOpen = !optionsOpen;\" aria-label=\"log in\">More Options</md-button><md-button class=\"md-raised md-primary\" aria-label=\"log in\">Log in</md-button><md-progress-circular ng-if=\"vm.inProgress\" md-mode=\"indeterminate\" md-diameter=\"20\"></md-progress-circular></div></form></div><md-sidenav md-is-open=\"optionsOpen\" class=\"md-sidenav-right\"><md-toolbar><h1 class=\"md-toolbar-tools\">More Options</h1></md-toolbar><md-content class=\"md-padding\"><div layout=\"row\"><div flex=\"50\"><h5>Forgot Password?</h5></div><div flex=\"50\"><md-button class=\"side-nav-btn\">Reset My Password</md-button></div></div><div layout=\"row\"><div flex=\"50\"><h5>Need An Account?</h5></div><div flex=\"50\"><md-button class=\"side-nav-btn\">Create an Account</md-button></div></div></md-content><div layout=\"row\" layout-align=\"center end\"><md-button ng-click=\"optionsOpen = false;\" class=\"md-raised md-warn\">Dismiss</md-button></div></md-sidenav></div>"
    );
    $templateCache.put("app/organization/mission-statement-modal.tpl.html",
        "<md-dialog flex=\"30\"><div layout=\"row\" layout-align=\"center\"><md-subheader><h3>Mission Statement</h3></md-subheader></div><div layout=\"row\" layout-align=\"center center\">{{modal.missionStatement}}</div><md-content><form class=\"form-horizontal\" name=\"modal.missionStatementForm\"><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-input-group class=\"long\"><label>New Mission Statement</label><md-input required name=\"newMissionStatement\" ng-model=\"modal.newMissionStatement\" autocapitalize=\"off\"></md-input></md-input-group></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"modal.formSubmitted && modal.missionStatementForm.newMissionStatement.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div></form><md-content><div class=\"md-actions\" style=\"border-top: none\" layout=\"row\" layout-align=\"center end\"><md-button class=\"md-raised md-warn\" ng-click=\"modal.closeModal()\" aria-label=\"cancel\">Cancel</md-button><md-button class=\"md-raised md-primary\" ng-click=\"modal.saveMissionStatement()\" aria-label=\"add\">Save</md-button><md-progress-circular ng-if=\"modal.currentlySaving\" md-mode=\"indeterminate\" md-diameter=\"20\"></md-progress-circular></div><md-dialog></md-dialog></md-content></md-content></md-dialog>"
    );
    $templateCache.put("app/organization/organization-members-modal.tpl.html",
        "<md-dialog flex=\"50\"><div layout=\"row\" layout-align=\"center\"><md-subheader><h3>Organization Members</h3></md-subheader></div><div layout=\"row\" layout-align=\"start center\"><ul class=\"list-horizontal\"><li ng-repeat=\"member in modal.members\"><h3>{{member.userName}}</h3><span class=\"sub-text\">{{member.role}}</span></li></ul></div><md-content><form class=\"form-horizontal\" name=\"modal.newMemberForm\"><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-input-group class=\"long\"><label>Username</label><md-input required name=\"newUserName\" ng-model=\"modal.newUser.name\" autocapitalize=\"off\"></md-input></md-input-group></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"modal.formSubmitted && modal.newMemberForm.newUserName.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-input-group class=\"long\"><label>Role</label><md-input required name=\"newUserRole\" ng-model=\"modal.newUser.role\" autocapitalize=\"off\"></md-input></md-input-group></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"modal.formSubmitted && modal.newMemberForm.newUserRole.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div></form><md-content><div class=\"md-actions\" style=\"border-top: none\" layout=\"row\" layout-align=\"center center\"><md-button class=\"md-raised md-warn\" ng-click=\"modal.closeModal()\" aria-label=\"cancel\">Close</md-button><md-button class=\"md-raised md-primary\" ng-click=\"modal.addMember()\" aria-label=\"add\">Add Member</md-button><md-progress-circular ng-if=\"modal.currentlySaving\" md-mode=\"indeterminate\" md-diameter=\"20\"></md-progress-circular></div><md-dialog></md-dialog></md-content></md-content></md-dialog>"
    );
    $templateCache.put("app/organization/organization-trees-selection.tpl.html",
        "<section class=\"organization-wrapper\"><div class=\"organization active\" style=\"margin-bottom: 5px\" layout=\"row\" layout-align=\"center\" id=\"organizationNode\"><div class=\"tree-node\">Organization #1</div><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised md-primary\" ok-collapse ok-toggle-color linked-to=\"organizationNode\" all-linked-nodes=\"['organizationNode', 'treesNode']\" aria-label=\"toggle\"><i class=\"fa fa-plus\"></i></md-button><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div><div layout=\"column\" layout-align=\"start end\"><md-button class=\"md-raised md-primary\" ng-click=\"vm.openOrganizationMembersModal()\" aria-label=\"members\"><i class=\"fa fa-users\"></i></md-button><md-button class=\"md-raised md-primary\" ng-click=\"vm.openMissionStatementModal()\" aria-label=\"mission statement\"><i class=\"fa fa-briefcase\"></i></md-button></div><div layout=\"column\" layout-align=\"start end\"><md-button class=\"md-raised md-primary\" ng-click=\"vm.openAddTreeModal()\" aria-label=\"Add Tree\"><i class=\"fa fa-tree\"></i><md-tooltip>Add a Tree</md-tooltip></md-button></div></div><div layout=\"column\" style=\"max-height: 100000px\" class=\"collapse\" id=\"treesNode\"><div class=\"centered-row\" layout=\"row\" layout-align=\"start center\" ng-repeat=\"treeRow in vm.formattedTrees\"><div class=\"objective\" layout=\"row\" layout-align=\"start\" ng-repeat=\"tree in treeRow\"><div class=\"tree-node\">{{tree.Name}}</div><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div></div></div></div></section>"
    );
    $templateCache.put("app/tree/add-tree-modal.tpl.html",
        "<md-dialog flex=\"30\"><div layout=\"row\" layout-align=\"center\"><md-subheader><h3>Add A Tree</h3></md-subheader></div><md-content><form class=\"form-horizontal\" name=\"modal.addTreeForm\"><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-input-group class=\"long\"><label>Tree Name</label><md-input required name=\"newTreeName\" ng-model=\"modal.newTreeName\" autocapitalize=\"off\"></md-input></md-input-group></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"modal.formSubmitted && modal.addTreeForm.newTreeName.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-radio-group class=\"horizontal-radio-group\" layout=\"row\" ng-model=\"modal.timeframe\"><md-radio-button value=\"monthly\" aria-label=\"Monthly\">Monthly</md-radio-button><md-radio-button value=\"yearly\" artial-label=\"Yearly\">Yearly</md-radio-button></md-radio-group></div></div></form><md-content><div class=\"md-actions\" style=\"border-top: none\" layout=\"row\" layout-align=\"center end\"><md-button class=\"md-raised md-warn\" ng-click=\"modal.closeModal()\" aria-label=\"cancel\">Cancel</md-button><md-button class=\"md-raised md-primary\" ng-click=\"modal.addTree()\" aria-label=\"add\">Add</md-button><md-progress-circular ng-if=\"modal.currentlySaving\" md-mode=\"indeterminate\" md-diameter=\"20\"></md-progress-circular></div><md-dialog></md-dialog></md-content></md-content></md-dialog>"
    );
    $templateCache.put("app/tree/tree.tpl.html",
        "<section class=\"organization-wrapper\"><div class=\"organization active\" layout=\"row\" layout-align=\"center\" id=\"organizationNode\"><div class=\"tree-node\">Tree #1</div><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised md-primary\" ok-collapse ok-toggle-color linked-to=\"organizationNode\" all-linked-nodes=\"vm.linkedNodeIds\" aria-label=\"toggle\"><i class=\"fa fa-plus\"></i></md-button><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div><div layout=\"column\" layout-align=\"start end\"><md-button class=\"md-raised md-primary\" ng-click=\"vm.openOrganizationMembersModal()\" aria-label=\"members\"><i class=\"fa fa-users\"></i></md-button><md-button class=\"md-raised md-primary\" ng-click=\"vm.openMissionStatementModal()\" aria-label=\"mission statement\"><i class=\"fa fa-briefcase\"></i></md-button></div></div><div layout=\"row\" class=\"collapse\" layout-align=\"center center\" id=\"objectiveNode\"><div class=\"objective\" layout=\"row\" layout-align=\"start\" ng-repeat=\"objective in [1, 2, 3, 4]\"><div class=\"tree-node\" layout-align=\"start\">Objective {{$index + 1}}</div><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised\" ok-collapse ok-toggle-color linked-to=\"objectiveNode\" all-linked-nodes=\"vm.linkedNodeIds\" aria-label=\"toggle\"><i class=\"fa fa-plus\"></i></md-button><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div></div></div><div layout=\"row\" class=\"collapse\" layout-align=\"center center\" id=\"keyResultNode\"><div class=\"key-result\" layout=\"row\" layout-align=\"start\"><div class=\"tree-node\">Key Result #1</div><div layout=\"column\" layout-align=\"end end\"><md-button href class=\"md-raised\" ok-collapse ok-toggle-color linked-to=\"keyResultNode\" all-linked-nodes=\"vm.linkedNodeIds\" aria-label=\"toggle\"><i class=\"fa fa-plus\"></i></md-button><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div></div><div class=\"key-result\" layout=\"row\" layout-align=\"start\"><div class=\"tree-node\">Key Result #2</div><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised\" ok-collapse ok-toggle-color linked-to=\"keyResultNode\" all-linked-nodes=\"vm.linkedNodeIds\" aria-label=\"toggle\"><i class=\"fa fa-plus\"></i></md-button><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div></div></div><div layout=\"column\" class=\"collapse\" ok-collapse linked-to=\"taskNode\" layout-align=\"space-around center\" all-linked-nodes=\"vm.linkedNodeIds\" id=\"taskNode\"><div layout=\"row\" layout-align=\"start center\" ng-repeat=\"task in [1, 2, 3, 4]\"><md-checkbox ng-model=\"vm.isChecked[$index]\" aria-label></md-checkbox><div class=\"task-node\">Task {{$index + 1}}</div></div></div></section>"
    );
}]);

(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function AddTreeModalController($scope, TreeFactory, $mdDialog, hardCoded) {
        var modal = this;

        modal.timeframe = 'monthly';
        modal.formSubmitted = false;

        modal.addTree = function () {
            modal.formSubmitted = true;
            if (modal.addTreeForm.$valid) {
                modal.currentlySaving = true;

                var tree = {
                    name: modal.newTreeName,
                    timeframe: modal.timeframe,
                    userId: hardCoded.userId,
                    username: hardCoded.userName
                };

                TreeFactory.createTree(hardCoded.org, tree)
                    .then(function (response) {
                        modal.currentlySaving = false;
                        modal.formSubmitted = false;
                        // $mdDialog.hide(response.data);
                    });
            }
        };

        modal.closeModal = function () {
            $mdDialog.hide();
        };
    }

    AddTreeModalController.$inject = ['$scope', 'TreeFactory', '$mdDialog', 'hardCoded'];

    app.controller('AddTreeModalController', AddTreeModalController);

})();
