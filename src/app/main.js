(function () {
    'use strict';

    //Define high level modules
    angular.module('SharedFactories', []);
    angular.module('HeaderModule', []);
    angular.module('OrganizationModule', []);
    angular.module('TreeModule', []);
    angular.module('LoginModule', []);
    angular.module('SharedServices', []);
    angular.module('SharedDirectives', []);
    angular.module('SharedFilters', []);

    var appDependencies = [
        'ui.router',
        'ngAnimate',
        'ipCookie',
        'ngAria',
        'ngMaterial',
        'okra.templates',
        'HeaderModule',
        'LoginModule',
        'OrganizationModule',
        'TreeModule',
        'SharedFactories',
        'SharedServices',
        'SharedDirectives',
        'SharedFilters',
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
        //create color palletes
        var okraGreen = $mdThemingProvider.extendPalette('green', {
            '500': '#99b742',
        });
        var okraGreenAccent = $mdThemingProvider.extendPalette('green', {
            'A200': '#99b742'
        });

        //define color extensions
        $mdThemingProvider.definePalette('okraGreen', okraGreen);
        $mdThemingProvider.definePalette('okraGreenAccent', okraGreenAccent);

        //register extensions to the theme
        $mdThemingProvider.theme('default')
            .primaryPalette('okraGreen')
            .accentPalette('okraGreenAccent');
    });

    //get the bootstrap data for the app
    app.run(function ($http, $location, $rootScope, $state, $window, session) {
        $http.get('app/bootstrap.json').success(function (data) {
            session.storeCredentials(data);
        });

        $window.isAuthenticated = function () {
            session.isAuthenticated();
        };

        //make sure users login before using the app
        $rootScope.$on('$stateChangeSuccess', function () {
            if ($state.current.name != "login" && !session.user) {
                $state.go('login');
            }
            if ($state.current.name == "login" && session.user) {
                $state.go('organizations');
            }
        });

    });

    //Constants
    /**
     * @ngdoc service
     * @name okra.okraAPI
     * @description
     *
     * # okraAPI
     * An object containing all the endpoints for the restful API backend.
     *
     */
    app.constant('okraAPI', {
        registerUser: 'http://localhost:8080/create/register',
        createOrg: 'http://localhost:8080/create/organization',
        updateMission: 'http://localhost:8080/update/mission/',
        updateMembers: 'http://localhost:8080/update/members/',
        getOrganizations: 'http://localhost:8080/get/orgs/all/',
        createTree: 'http://localhost:8080/create/tree/',
        getTreesInOrg: 'http://localhost:8080/get/trees/',
        getSingleTreeInOrg: 'http://localhost:8080/get/trees/',
        createObjective: 'http://localhost:8080/create/objective/', // objective name
        updateObjective: 'http://localhost:8080/update/objective/properties/', // orgName / treeID / objID
        createKeyResult: 'http://localhost:8080/create/kr/', // keyresult name / objective name
        updateKeyResult: 'http://localhost:8080/update/kr/properties/', // orgName / treeid / objID / krIndex
        createTask: 'http://localhost:8080/create/task/', // orgName / objId / taskIndex
        updateTask: 'http://localhost:8080/update/task/properties/' // orgName / treeId / objId / krIndex / taskIndex
    });

    app.constant('hardCoded', {
        userId: '54d55f11673e6cfceef7e097',
        userName: 'someuser123'
    });

    //could turn this into a service? So we can change whenever we want for 2.0
    app.constant('jsPlumbDefaults', {
        PaintStyle: {
            lineWidth: 3,
            strokeStyle: "#99b742",
            outlineWidth: 1
        },
        EndpointStyle: {
            fillStyle: "#99b742",
            radius: 4
        },
        Connector: ["Bezier", {
            curviness: 20
        }],
        Anchors: ["BottomCenter", "TopCenter"],
        ConnectionsDetachable: false,
        ReattachConnections: false

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
        $urlRouterProvider.otherwise('/404');

        $stateProvider
        /**
         * @ngdoc method
         * @name 404
         * @description Route for a page not found error (404).
         * @methodOf uiRouter.states
         * @param {string}
         *     url /404
         */
            .state('404', {
                url: '/404',
                templateUrl: 'app/shared/404.tpl.html'
            })
            /**
             * @ngdoc method
             * @name login
             * @description Route for logging in to the app. (acts as the base url)
             * @methodOf uiRouter.states
             * @param {string}
             *     url /
             */
            .state('login', {
                url: '/',
                templateUrl: 'app/login/login.tpl.html',
                controller: 'LoginController as vm'
            })
            /**
             * @ngdoc method
             * @name organization/tree
             * @description Route for interacting with / viewing a single tree. Takes an AES encoded ID.
             * @methodOf uiRouter.states
             * @param {string}
             *     url /organization/:organization/tree/:treeIdEnc
             */
            .state('organization/tree', {
                url: '/organization/:organization/tree/:treeIdEnc',
                templateUrl: 'app/tree/tree.tpl.html',
                controller: 'TreeController as vm'
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
            })
            /**
             * @ngdoc method
             * @name organizations
             * @description Route for interacting with / viewing all the organizations that belong to that user.
             * @methodOf uiRouter.states
             * @param {string}
             *     url /organizations
             */
            .state('organizations', {
                url: '/organizations',
                templateUrl: 'app/organization/organization-selection.tpl.html',
                controller: 'OrganizationSelectionController as vm'
            });
    });
})();

(function () {
    'use strict';

    var app = angular.module('HeaderModule');

    function HeaderController($scope, $mdDialog, hardCoded, session, $interval) {
        var vm = this;

        vm.userName = hardCoded.userName;
        vm.session = session;
        vm.dropdownOpen = false;

    }

    HeaderController.$inject = ['$scope', '$mdDialog', 'hardCoded', 'session', '$interval'];

    app.controller('HeaderController', HeaderController);

})();

(function () {
    'use strict';

    var app = angular.module('LoginModule');

    function LoginController(session) {
        var vm = this;

        vm.session = session;

        session.isAuthenticating = false;

        vm.googleLogin = function () {
            session.gAuthenticate(false);
            session.isAuthenticating = true;
        };

    }

    LoginController.$inject = ['session'];

    app.controller('LoginController', LoginController);

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
                    $mdDialog.hide(response);
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

    var app = angular.module('OrganizationModule');

    function AddTreeModalController($scope, TreeFactory, $mdDialog, hardCoded, organization) {
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

                TreeFactory.createTree(organization, tree)
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

    AddTreeModalController.$inject = ['$scope', 'TreeFactory', '$mdDialog', 'hardCoded', 'organization'];

    app.controller('AddTreeModalController', AddTreeModalController);

})();

(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationController($scope, $mdDialog, TreeFactory, $stateParams, OrganizationFactory) {
        var vm = this;

        vm.organization = $stateParams.organization;

        vm.linkedNodeIds = ['organizationNode', 'objectiveNode', 'keyResultNode', 'taskNode'];

        TreeFactory.getTrees(vm.organization)
            .then(function (response) {
                vm.trees = TreeFactory.formatTrees(response.data.Success);
            });

        vm.openOrganizationMembersModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/shared/members-modal/members-modal.tpl.html',
                controller: 'MembersModalController',
                controllerAs: 'modal',
                locals: {
                    members: vm.orgMembers,
                    apiFactory: OrganizationFactory,
                    node: vm.organization
                }
            }).then(function (response) {
                vm.orgMembers = response;
            });
        };

        vm.openAddTreeModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/organization/add-tree-modal.tpl.html',
                controller: 'AddTreeModalController',
                controllerAs: 'modal',
                locals: {
                    organization: vm.organization
                }
            }).then(function (response) {
                if (response && !response.Error) {
                    vm.formattedTrees = angular.copy(vm.trees);
                    vm.formattedTrees.push(response.Success);
                    vm.formattedTrees = _.flatten(vm.formattedTrees);
                    vm.trees = TreeFactory.formatTrees(vm.formattedTrees);
                }
            });
        };
    }

    OrganizationController.$inject = ['$scope', '$mdDialog', 'TreeFactory', '$stateParams', 'OrganizationFactory'];

    app.controller('OrganizationController', OrganizationController);

})();

(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationSelectionController($scope, $mdDialog, OrganizationFactory, hardCoded, TreeFactory) {
        var vm = this;

        function getOrganizations() {
            OrganizationFactory.getOrganizations(hardCoded.userId)
                .then(function (response) {
                    vm.organizations = TreeFactory.formatTrees(response.data.Success);
                });
        }

        vm.addOrganization = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/organization/add-organization-modal.tpl.html',
                controller: 'AddOrganizationModalController',
                controllerAs: 'modal'
            }).then(function (response) {
                if (response) {
                    getOrganizations();
                }
            });
        };

        function init() {
            getOrganizations();
        }

        init();
    }

    OrganizationSelectionController.$inject = ['$scope', '$mdDialog', 'OrganizationFactory', 'hardCoded',
        'TreeFactory'
    ];

    app.controller('OrganizationSelectionController', OrganizationSelectionController);

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

    OrganizationFactory.$inject = ['$http', 'okraAPI', 'hardCoded'];

    app.factory('OrganizationFactory', OrganizationFactory);

})();

(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name SharedDirectives.directive:organization-summary-widget
     * @restrict A
     *
     * @description
     *
     * Widget that contains information about the current organization. Contains a members button, org name and logo.
     */

    var app = angular.module('SharedDirectives');

    function organizationSummaryWidget() {
        return {
            restrict: 'A',
            // link: linkFunc,
            templateUrl: 'app/organization/organization-summary-widget.tpl.html'
        };

        // function linkFunc(scope, iElement, iAttrs) {

        // }
    }

    // organizationSummaryWidget.$inject = [];

    app.directive('organizationSummaryWidget', organizationSummaryWidget);

})();

(function () {

    'use strict';

    var app = angular.module('SharedFilters');

    /**
     * @ngdoc filter
     * @name SharedFilters.okDecrypt
     * @description
     *
     * # Routes
     * A filter used to decrypt a string with AES encryption.
     *
     * @usage
     *
     * <div> {{name | okDecrypt}} </div>
     */

    app.filter('okDecrypt', function () {

        return function (encryptedString) {
            var decrypted = CryptoJS.AES.decrypt(encryptedString, "DPokraPC");

            return decrypted.toString(CryptoJS.enc.Utf8);
        };

    });

})();

(function () {

    'use strict';

    var app = angular.module('SharedFilters');

    /**
     * @ngdoc filter
     * @name SharedFilters.okEncrypt
     * @description
     *
     * # Routes
     * A filter used to encrypt a string with AES encryption.
     *
     * @usage
     *
     * <div> {{name | okEncrypt}} </div>
     */

    function okEncrypt() {

        return function (string) {
            var encrypted = CryptoJS.AES.encrypt(string, "DPokraPC");

            return encrypted.toString();
        };

    }

    app.filter('okEncrypt', okEncrypt);
})();

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

    var app = angular.module('SharedServices');
    /**
     * @ngdoc service
     * @name SharedServices.session
     * @description
     *
     * # session
     * Interacts with the current session.
     *
     */

    function session($http, $state, $timeout, $mdToast, okraAPI, ipCookie) {

        var service = {};

        service.gAuthenticate = function (isSilent) {

            var currentTime = new Date().getTime(),
                previousTokenExpiration = ipCookie('okTokenExpirationDate') * 1000;

            gapi.client.setApiKey(service.authCreds.gApiKey);

            gapi.auth.authorize({
                    client_id: service.authCreds.gauthClientId,
                    scope: 'https://www.googleapis.com/auth/userinfo.profile',
                    immediate: isSilent
                })
                .then(function (response) {
                    if (response.access_token) {
                        session.auth = {
                            accessToken: response.access_token,
                            tokenLifespan: response.expires_in
                        };
                        ipCookie('okSession', response.access_token);
                        ipCookie('okTokenExpirationDate', response.expires_at);
                        service.getProfile(isSilent);
                        session.isAuthenticating = false;
                    }
                }, function (response) {
                    console.log('Silent login failed');
                    session.isAuthenticating = false;
                });
        };

        service.getProfile = function (isSilent) {
            gapi.client.load('plus', 'v1').then(function () {
                var request = gapi.client.plus.people.get({
                    'userId': 'me'
                });
                request.then(function (response) {
                    service.user = response.result;
                    // service.updateUser(response.result);
                    if ($state.current.name == "login") {
                        $state.go('organizations');
                    }
                    if (!isSilent) {
                        $mdToast.show(
                            $mdToast.simple()
                            .content('Welcome ' + service.user.displayName)
                            .position('top right')
                            .hideDelay(3000)
                        );
                    }
                    //refresh the auth token in 40 minutes if the user remains active on the app
                    service.beginAuthCountdown(2400000);


                }, function (response) {
                    //invalid credentials let's authenticate and try again
                    if (response.error === '401') {
                        service.gAuthenticate(true);
                    }
                });
            });
        };

        service.updateUser = function (user) {
            //look for the user on the backend to update user obj

            //save session and related tokens on the back end if no user found
            $http.post(okraAPI.registerUser, {
                userName: session.user.displayName
            });
        };

        service.beginAuthCountdown = function (time) {
            service.authCountdown = $timeout(function () {
                service.gAuthenticate(true);
            }, time);
        };

        service.storeCredentials = function (credentials) {
            service.authCreds = {
                gauthClientId: credentials.gauthClientId,
                gApiKey: credentials.gApiKey
            };
        };

        service.isAuthenticated = function () {
            //silently attempt to login
            service.gAuthenticate(true);
        };

        service.logOut = function () {
            //cancel the refresh timer
            $timeout.cancel(service.authCountdown);
            $state.go('login');
            service.user = undefined;
        };

        return service;
    }

    session.$inject = ['$http', '$state', '$timeout', '$mdToast', 'okraAPI', 'ipCookie'];

    app.factory('session', session);

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
                    if (!isCollapsed) {
                        $animate.addClass(node, 'collapse');
                        $animate.removeClass(thisNode.next(), 'collapse');
                        thisNode.next().children().removeClass('active');
                    }
                    if (isCollapsed) {
                        $animate.removeClass(node, 'collapse');
                        i = allNodes.length;
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

    var app = angular.module('SharedDirectives');

    /**
     * @ngdoc directive
     * @name SharedDirectives.directive:ok-draw-connection
     * @restrict A
     *
     * @description
     * @param {string} parent-id Id of the parent this node will be linked to (required).
     *  ** Not used as a scope attr because of multi dir instead use as normal attribute.
     *
     * @usage
     *<div id="uniqueIdOne"></div>
     *<div id="uniqueIdTwo" ok-draw-connection parent-id="uniqueOne"></div>
     */


    app.directive('okDrawConnection', function (jsPlumbDefaults, $window) {
        return {
            restrict: 'A',
            link: linkFunc
        };

        function linkFunc(scope, iElement, iAttrs) {
            var parentId = iAttrs.parentId;

            scope.$on('$stateChangeStart', function () {
                jsPlumb.detachEveryConnection(parentId);
            });

            //repaint all connections
            $window.onresize = function (event) {
                $window.jsPlumb.repaintEverything();
            };


            iElement.on('click', function () {
                jsPlumb.detachEveryConnection(parentId);
                iElement.parent().parent().children().removeClass('active');
                if (!iElement.hasClass('active')) {
                    iElement.parent().addClass('active');
                    jsPlumb.importDefaults(jsPlumbDefaults);
                    traverseUpwards(iElement.attr('id'));
                    jsPlumb.draggable(iElement[0].id);
                } else {
                    iElement.parent().removeClass('active');
                }
            });

            function traverseUpwards(nodeId) {
                var element = angular.element(document.getElementById(nodeId));
                var parentId = element.attr('parent-id');
                if (!parentId) {
                    return;
                }
                jsPlumb.connect({
                    source: parentId,
                    target: nodeId,
                    detachable: false
                });

                jsPlumb.setDraggable(nodeId, false);

                traverseUpwards(parentId);
            }
        }
    });

})();

angular.module('okra.templates', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put("app/login/login.tpl.html",
        "<div class=\"green-overlay\" layout=\"column\" layout-align=\"center center\" flex=\"100\"><div layout=\"row\" layout-align=\"center center\"><img class=\"logo\" src=\"assets/okra-logo-large.png\"></div><div layout=\"row\" layout-align=\"center center\"><h1 class=\"slogan\">An OKR management tool to keep your team on track.</h1></div><md-button class=\"md-raised md-warn\" ng-click=\"vm.googleLogin()\" aria-label=\"log in\"><div layout=\"row\" layout-align=\"center center\"><i ng-if=\"!vm.session.isAuthenticating\" class=\"fa fa-google\"></i><md-progress-circular ng-if=\"vm.session.isAuthenticating\" md-mode=\"indeterminate\" md-diameter=\"20\"></md-progress-circular><span>Sign in with Google</span></div></md-button></div>"
    );
    $templateCache.put("app/organization/add-organization-modal.tpl.html",
        "<md-dialog flex=\"30\"><div layout=\"row\" layout-align=\"center\"><md-subheader><h3>Add An Organization</h3></md-subheader></div><md-content><div layout=\"row\" layout-align=\"center\"><form class=\"form-horizontal\" name=\"modal.organizationForm\"><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-input-container class=\"long\"><label>Organization Name</label><md-input required name=\"organizationName\" ng-model=\"modal.organizationName\" autocapitalize=\"off\"></md-input></md-input-container></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"modal.formSubmitted && modal.organizationForm.organizationName.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div></form></div><md-content><div class=\"md-actions\" layout=\"row\" layout-align=\"center end\"><md-button class=\"md-raised md-warn\" ng-click=\"modal.closeModal()\" aria-label=\"cancel\">Cancel</md-button><md-button class=\"md-raised md-primary\" ng-click=\"modal.createOrganization(modal.organizationName)\" aria-label=\"add\">Add</md-button></div><md-dialog></md-dialog></md-content></md-content></md-dialog>"
    );
    $templateCache.put("app/organization/add-tree-modal.tpl.html",
        "<md-dialog flex=\"30\"><div layout=\"row\" layout-align=\"center\"><md-subheader><h3>Add A Tree</h3></md-subheader></div><md-content><form class=\"form-horizontal\" name=\"modal.addTreeForm\"><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-input-container class=\"long\"><label>Tree Name</label><md-input required name=\"newTreeName\" ng-model=\"modal.newTreeName\" autocapitalize=\"off\"></md-input></md-input-container></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"modal.formSubmitted && modal.addTreeForm.newTreeName.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-radio-group class=\"horizontal-radio-group\" layout=\"row\" ng-model=\"modal.timeframe\"><md-radio-button value=\"quarterly\" aria-label=\"Quarterly\">Quarterly</md-radio-button><md-radio-button value=\"annually\" artial-label=\"Annually\">Annually</md-radio-button></md-radio-group></div></div></form><md-content><div class=\"md-actions\" style=\"border-top: none\" layout=\"row\" layout-align=\"center end\"><md-button class=\"md-raised md-warn\" ng-click=\"modal.closeModal()\" aria-label=\"cancel\">Cancel</md-button><md-button class=\"md-raised md-primary\" ng-click=\"modal.addTree()\" aria-label=\"add\">Add</md-button><md-progress-circular ng-if=\"modal.currentlySaving\" md-mode=\"indeterminate\" md-diameter=\"20\"></md-progress-circular></div><md-dialog></md-dialog></md-content></md-content></md-dialog>"
    );
    $templateCache.put("app/organization/organization-selection.tpl.html",
        "<section class=\"organization-wrapper\"><div layout-align=\"center center\" layout=\"row\"><h1>Organizations</h1></div><div class=\"centered-row\" layout=\"row\" layout-align=\"start center\" ng-repeat=\"organizationRow in vm.organizations track by $index\"><div class=\"organization\" layout=\"row\" layout-align=\"start center\" ng-repeat=\"org in organizationRow track by $index\"><a href class=\"tree-node\" ui-sref=\"organization({ organization: org })\">{{org}}<md-tooltip ng-if=\"org.length > 14\">{{org}}</md-tooltip></a></div><div class=\"organization add-node\" layout=\"row\" layout-align=\"start center\" ng-if=\"organizationRow.length < 4\"><button class=\"tree-node\" ng-click=\"vm.addOrganization()\" aria-label=\"cancel\"><div>Add</div><div>an Org. <i class=\"fa fa-plus\"></i></div></button></div></div><div layout=\"row\" layout-align=\"center center\" class=\"disable-animations\" ng-if=\"vm.organizations.length === 0 || !vm.organizations\">New to Okra? That's alright.<md-button class=\"md-raised md-primary\" ng-click=\"vm.addOrganization()\" aria-label=\"cancel\">Create an Organization <i class=\"fa fa-plus\"></i></md-button></div></section>"
    );
    $templateCache.put("app/organization/organization-summary-widget.tpl.html",
        "<div class=\"organization-widget\"><img class=\"logo\" src=\"assets/okra-default-logo.png\"><div class=\"org-name\">{{vm.organization}}</div><div><md-button class=\"md-raised\" aria-label=\"members\">Members</md-button></div></div>"
    );
    $templateCache.put("app/organization/organization-trees-selection.tpl.html",
        "<section class=\"organization-wrapper\"><div class=\"organization active\" style=\"margin-bottom: 5px\" layout=\"row\" layout-align=\"center\" id=\"organizationNode\"><div class=\"tree-node\">{{vm.organization}}</div><div layout=\"column\" layout-align=\"start end\"><md-button class=\"md-raised md-primary\" ng-click=\"vm.openOrganizationMembersModal()\" aria-label=\"members\"><i class=\"fa fa-users\"></i></md-button></div></div><div layout=\"column\" id=\"treesNode\"><div class=\"centered-row\" layout=\"row\" layout-align=\"start center\" ng-repeat=\"treeRow in vm.trees track by $index\"><div class=\"tree\" layout=\"row\" layout-align=\"start\" ng-repeat=\"tree in treeRow track by $index\"><a class=\"tree-node\" ng-hide=\"tree.isEditMode\" ui-sref=\"organization/tree({ treeIdEnc: (tree.Id | okEncrypt), organization: vm.organization })\">{{tree.Name}}<md-tooltip ng-if=\"tree.Name.length > 14\">{{tree.Name}}</md-tooltip></a></div><div class=\"tree add-node\" layout-align=\"start\" ng-if=\"treeRow.length < 4\"><button href class=\"tree-node\" ng-click=\"vm.openAddTreeModal()\" ng-click=\"vm.openAddTreeModal()\" aria-label=\"Add Tree\"><div>Add</div><div>A Tree <i class=\"fa fa-plus\"></i></div></button></div></div><div class=\"centered-row\" ng-if=\"vm.trees.length === 0\" layout=\"row\" layout-align=\"start center\"><div class=\"tree add-node\" layout-align=\"start\"><button href class=\"tree-node\" ng-click=\"vm.openAddTreeModal()\" ng-click=\"vm.openAddTreeModal()\" aria-label=\"Add Tree\"><div>Add</div><div>A Tree <i class=\"fa fa-plus\"></i></div></button></div></div></div></section>"
    );
    $templateCache.put("app/shared/404.tpl.html",
        "<div class=\"error-not-found\" layout=\"column\" align=\"center center\"><img src=\"assets/okra-404.jpg\"><h1>That's Strange...</h1><h2>Probably not what you were looking for right?</h2></div>"
    );
    $templateCache.put("app/shared/members-modal/members-modal.tpl.html",
        "<md-dialog flex=\"50\"><div layout=\"row\" layout-align=\"center\"><md-subheader><h3>Members</h3></md-subheader></div><div layout=\"row\" layout-align=\"start center\"><ul class=\"list-horizontal\"><li ng-repeat=\"member in modal.members\"><h3>{{member.userName}}</h3><span class=\"sub-text\">{{member.role}}</span></li></ul></div><md-content><form class=\"form-horizontal\" name=\"modal.newMemberForm\"><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-input-container class=\"long\"><label>Username</label><md-input required name=\"newUserName\" ng-model=\"modal.newUser.name\" autocapitalize=\"off\"></md-input></md-input-container></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"modal.formSubmitted && modal.newMemberForm.newUserName.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-radio-group class=\"horizontal-radio-group\" layout=\"row\" ng-model=\"modal.newUser.role\"><md-radio-button value=\"member\" aria-label=\"Member\">Member</md-radio-button><md-radio-button value=\"admin\" artial-label=\"Admin\">Admin</md-radio-button></md-radio-group></div></div></form><md-content><div class=\"md-actions\" style=\"border-top: none\" layout=\"row\" layout-align=\"center center\"><md-button class=\"md-raised md-warn\" ng-click=\"modal.closeModal()\" aria-label=\"cancel\">Close</md-button><md-button class=\"md-raised md-primary\" ng-click=\"modal.addMember()\" aria-label=\"add\">Add Member</md-button><md-progress-circular ng-if=\"modal.currentlySaving\" md-mode=\"indeterminate\" md-diameter=\"20\"></md-progress-circular></div><md-dialog></md-dialog></md-content></md-content></md-dialog>"
    );
    $templateCache.put("app/tree/mission-statement-modal.tpl.html",
        "<md-dialog flex=\"30\"><div layout=\"row\" layout-align=\"center\"><md-subheader><h3>Mission Statement</h3></md-subheader></div><div layout=\"row\" layout-align=\"center center\">{{modal.missionStatement}}</div><md-content><form class=\"form-horizontal\" name=\"modal.missionStatementForm\"><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-input-container class=\"long\"><label>New Mission Statement</label><md-input required name=\"newMissionStatement\" ng-model=\"modal.newMissionStatement\" autocapitalize=\"off\"></md-input></md-input-container></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"modal.formSubmitted && modal.missionStatementForm.newMissionStatement.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div></form><md-content><div class=\"md-actions\" style=\"border-top: none\" layout=\"row\" layout-align=\"center end\"><md-button class=\"md-raised md-warn\" ng-click=\"modal.closeModal()\" aria-label=\"cancel\">Cancel</md-button><md-button class=\"md-raised md-primary\" ng-click=\"modal.saveMissionStatement()\" aria-label=\"add\">Save</md-button><md-progress-circular ng-if=\"modal.currentlySaving\" md-mode=\"indeterminate\" md-diameter=\"20\"></md-progress-circular></div><md-dialog></md-dialog></md-content></md-content></md-dialog>"
    );
    $templateCache.put("app/tree/node-modal-dashboard.tpl.html",
        "<md-dialog flex=\"30\"><div layout=\"row\" layout-align=\"center\" ng-class=\"{completed: modal.node.Completed === true}\"><md-subheader><h3><span ng-if=\"!modal.editMode\">Create</span> {{modal.name}}</h3></md-subheader></div><md-content><form class=\"form-horizontal\" name=\"modal.nodeForm\"><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\" flex=\"100\"><md-input-container flex><label>Name</label><md-input required name=\"nodeName\" md-maxlength=\"30\" ng-model=\"modal.node.Name\" autocapitalize=\"off\"></md-input></md-input-container></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"modal.formSubmitted && modal.nodeForm.nodeName.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\" flex=\"100\"><md-input-container flex><label>Description</label><textarea required name=\"nodeBody\" ng-model=\"modal.node.Body\" columns=\"1\" md-maxlength=\"150\"></textarea></md-input-container></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"modal.formSubmitted && modal.nodeForm.nodeBody.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\" layout=\"row\" flex=\"100\"><md-checkbox class=\"horizontal-checkbox\" ng-change=\"modal.addMember(member, member.isChecked)\" ng-model=\"member.isChecked\" aria-label=\"{{member.userName}}\" ng-repeat=\"member in modal.members\">{{member.userName}}</md-checkbox></div></div><div layout=\"row\" layout-align=\"center center\" ng-if=\"modal.nodeType === 'Key Result' || modal.nodeType === 'Task'\"><div layout-align=\"start-start\" layout=\"row\" flex=\"100\"><md-switch ng-model=\"modal.node.Priority\" aria-label=\"Priority\" ng-true-value=\"'High'\" ng-false-value=\"'Low'\" class=\"md-warn\">{{modal.node.Priority}} Priority</md-switch></div></div><div layout=\"row\" layout-align=\"center center\"><md-checkbox ng-model=\"modal.node.Completed\" aria-label=\"completed\">Completed?</md-checkbox></div></form><md-content><div class=\"md-actions\" style=\"border-top: none\" layout=\"row\" layout-align=\"center end\"><md-button class=\"md-raised md-warn\" ng-click=\"modal.closeModal()\" aria-label=\"cancel\">Cancel</md-button><md-button ng-if=\"!modal.editMode\" class=\"md-raised md-primary\" ng-click=\"modal.createNode()\" aria-label=\"add\">Create</md-button><md-button ng-if=\"modal.editMode\" class=\"md-raised md-primary\" ng-click=\"modal.updateNode()\" aria-label=\"add\">Save</md-button><md-progress-circular ng-if=\"modal.currentlySaving\" md-mode=\"indeterminate\" md-diameter=\"20\"></md-progress-circular></div><md-dialog></md-dialog></md-content></md-content></md-dialog>"
    );
    $templateCache.put("app/tree/tree.tpl.html",
        "<section class=\"organization-wrapper\"><div organization-summary-widget></div><div class=\"tree active\" layout=\"row\" layout-align=\"center\" id=\"organizationNode\"><button class=\"tree-node\" id=\"treeNode\" ok-collapse linked-to=\"organizationNode\" all-linked-nodes=\"vm.linkedNodeIds\">{{vm.tree.TreeName}}<md-tooltip ng-if=\"vm.tree.TreeName.length > 14\">{{vm.tree.TreeName}}</md-tooltip></button><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div><div layout=\"column\" layout-align=\"start end\"><md-button class=\"md-raised md-primary\" ng-click=\"vm.openTreeMembersModal()\" aria-label=\"members\"><i class=\"fa fa-users\"></i></md-button><md-button class=\"md-raised md-primary\" ng-click=\"vm.openMissionStatementModal()\" aria-label=\"mission statement\"><i class=\"fa fa-briefcase\"></i></md-button></div></div><div layout=\"row\" class=\"collapse\" layout-align=\"center center\" id=\"objectiveNode\"><div class=\"objective\" layout=\"row\" layout-align=\"start\" ng-repeat=\"objective in vm.tree.Objectives track by $index\"><button class=\"tree-node\" id=\"objective{{$index}}\" ng-click=\"vm.changeCurrentObjective($index, objective)\" layout-align=\"start\" ok-collapse linked-to=\"objectiveNode\" all-linked-nodes=\"vm.linkedNodeIds\" ok-draw-connection parent-id=\"treeNode\">{{objective.Name}}<md-tooltip ng-if=\"objective.Name.length > 14\">{{objective.Name}}</md-tooltip><span class=\"status\" ng-if=\"objective.Completed === true\"><i class=\"fa fa-check\"></i></span></button><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised md-primary fade-in\" ng-click=\"vm.openNodeModalDashboard($event, true, 'Objective', objective, false, false)\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div></div><div class=\"objective add-node\" layout=\"row\" layout-align=\"start\" ng-if=\"vm.tree.Objectives.length !== 4\"><button ng-click=\"vm.openNodeModalDashboard($event, false, 'Objective', {}, false, false)\" class=\"tree-node\" layout-align=\"start\"><div>Add</div><div>Objective <i class=\"fa fa-plus\"></i></div></button></div></div><div layout=\"row\" class=\"collapse\" layout-align=\"center center\" id=\"keyResultNode\"><div class=\"key-result\" layout=\"row\" layout-align=\"start\" ng-repeat=\"keyResult in vm.currentObjective.KeyResults track by $index\"><button class=\"tree-node\" id=\"keyResult{{$index}}\" ng-class=\"{completed: keyResult.Completed === true}\" ng-click=\"vm.changeCurrentKeyResult(keyResult)\" ok-collapse linked-to=\"keyResultNode\" all-linked-nodes=\"vm.linkedNodeIds\" ok-draw-connection parent-id=\"{{vm.currentObjective.nodeId}}\" aria-label=\"toggle\">{{keyResult.Name}}<md-tooltip ng-if=\"keyResult.Name.length > 14\">{{keyResult.Name}}</md-tooltip><span class=\"status\" ng-if=\"keyResult.Completed === true\"><i class=\"fa fa-check\"></i></span> <span class=\"status\" ng-if=\"!keyResult.Completed && keyResult.Priority === 'High'\"><md-tooltip>High Priority</md-tooltip><i class=\"fa fa-exclamation\"></i></span></button><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised md-primary fade-in\" ng-click=\"vm.openNodeModalDashboard($event, true, 'Key Result', keyResult, vm.currentObjective, false)\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div></div><div class=\"key-result add-node\" layout=\"row\" layout-align=\"start\" ng-if=\"vm.currentObjective.KeyResults.length !== 4\"><button ng-click=\"vm.openNodeModalDashboard($event, false, 'Key Result', {}, vm.currentObjective, false)\" class=\"tree-node\" layout-align=\"start\"><div>Add</div><div>Key Result <i class=\"fa fa-plus\"></i></div></button></div></div><div layout=\"column\" class=\"collapse task-column\" ok-collapse linked-to=\"taskNode\" layout-align=\"space-around center\" all-linked-nodes=\"vm.linkedNodeIds\" id=\"taskNode\"><div layout=\"row\" layout-align=\"start center\" ng-repeat=\"task in vm.currentKeyResult.Tasks\"><md-checkbox ng-model=\"task.Completed\" aria-label></md-checkbox><a href class=\"task-node\" ng-click=\"vm.openNodeModalDashboard($event, true, 'Task', task, vm.currentObjective, vm.currentKeyResult)\">{{task.Name}} <span class=\"status\" ng-if=\"!task.Completed && task.Priority === 'High'\"><md-tooltip>High Priority</md-tooltip><i class=\"fa fa-exclamation\"></i></span></a></div><div class=\"task-row\" layout=\"row\" layout-align=\"start center\" ng-if=\"vm.currentKeyResult.Tasks.length !== 9\"><md-button ng-click=\"vm.openNodeModalDashboard($event, false, 'Task', {}, vm.currentObjective, vm.currentKeyResult)\" class=\"md-primary md-raised\">Add Task <i class=\"fa fa-plus\"></i></md-button></div></div></section>"
    );
}]);

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

    var app = angular.module('TreeModule');

    function NodeModalDashboardController($scope, TreeFactory, $mdDialog, editMode, nodeType, node, tree,
        parentNode, secondaryParentNode) {
        var modal = this;
        var secondParentNode;
        modal.editMode = editMode;
        modal.nodeType = nodeType;
        modal.name = editMode ? node.Name : nodeType;
        modal.formSubmitted = false;
        modal.members = angular.copy(tree.Members);
        modal.node = angular.copy(node);

        if (!editMode) {
            modal.node.Members = [];

            if (nodeType === 'Objective') {
                modal.node.Id = 'obj' + (tree.Objectives.length + 1);
            }
            if (nodeType === 'Key Result') {
                modal.node.Id = 'kr' + (parentNode.KeyResults.length + 1);
            }
            if (nodeType === 'Task') {
                modal.node.Id = 'task' + (secondaryParentNode.Tasks.length + 1);
            }
        } else {
            _.each(modal.members, function (member, index) {
                if (modal.node.Members[index] && modal.node.Members[index].userName === member.userName) {
                    member.isChecked = true;
                }
            });
        }

        if (nodeType === 'Key Result' || nodeType === 'Task') {
            modal.node.Priority = node.Priority ? node.Priority : 'Low';
        }
        if (nodeType === 'Task') {
            secondParentNode = secondaryParentNode;
        }

        modal.createNode = function () {
            modal.formSubmitted = true;

            if (modal.nodeForm.$valid) {
                var apiMethod = 'create' + nodeType.replace(' ', '');
                TreeFactory[apiMethod](tree, modal.node, parentNode, secondParentNode)
                    .then(function (response) {
                        if (response.data.Success) {
                            $mdDialog.hide({
                                node: modal.node,
                                parentNode: parentNode
                            });
                        }
                    });
            }
        };

        modal.updateNode = function () {
            modal.formSubmitted = true;
            if (modal.nodeForm.$valid) {
                var apiMethod = 'update' + nodeType.replace(' ', '');
                TreeFactory[apiMethod](tree, modal.node, parentNode, secondParentNode)
                    .then(function (response) {
                        if (response.data.Success) {
                            $mdDialog.hide({
                                node: modal.node,
                                parentNode: parentNode
                            });
                        }
                    });
            }
        };

        modal.addMember = function (member, added) {
            if (added) {
                modal.node.Members.push(member);
            } else {
                modal.node.Members = _.reject(node.Members, function (singleMember) {
                    return singleMember === member;
                });
            }
        };

        modal.closeModal = function () {
            $mdDialog.hide();
        };
    }

    NodeModalDashboardController.$inject = ['$scope', 'TreeFactory', '$mdDialog', 'editMode', 'nodeType', 'node',
        'tree', 'parentNode', 'secondaryParentNode'
    ];

    app.controller('NodeModalDashboardController', NodeModalDashboardController);
})();

(function () {
    'use strict';

    var app = angular.module('TreeModule');

    function TreeController($scope, $mdDialog, TreeFactory, $stateParams, $filter) {
        jsPlumb.detachEveryConnection();
        var vm = this,
            treeId = $filter('okDecrypt')($stateParams.treeIdEnc);

        function getTree() {
            TreeFactory.getSingleTree($stateParams.organization, treeId)
                .then(function (response) {
                    vm.tree = response.data.Success;
                });
        }

        function getNodeIndex(array, id) {
            return _.findIndex(array, function (node) {
                return node.Id === id;
            });
        }

        vm.linkedNodeIds = ['organizationNode', 'objectiveNode', 'keyResultNode', 'taskNode'];
        vm.organization = $stateParams.organization;

        vm.changeCurrentObjective = function (nodeId, objective) {
            vm.currentObjective = objective;
            vm.currentObjective.nodeId = 'objective' + nodeId;
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
                    missionStatement: vm.tree.Mission
                }
            }).then(function (response) {
                vm.tree.Mission = response;
            });
        };

        vm.openTreeMembersModal = function ($event) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/shared/members-modal/members-modal.tpl.html',
                controller: 'MembersModalController',
                controllerAs: 'modal',
                locals: {
                    members: vm.tree.Members,
                    apiFactory: TreeFactory,
                    node: vm.tree
                }
            }).then(function (response) {
                if (response) {
                    vm.tree.Members.push(response);
                }
            });
        };

        vm.openNodeModalDashboard = function ($event, editMode, nodeType, node, parentNode, secondaryParentNode) {
            $mdDialog.show({
                targetEvent: $event,
                templateUrl: 'app/tree/node-modal-dashboard.tpl.html',
                controller: 'NodeModalDashboardController',
                controllerAs: 'modal',
                locals: {
                    editMode: editMode,
                    nodeType: nodeType,
                    node: node,
                    tree: vm.tree,
                    parentNode: parentNode,
                    secondaryParentNode: secondaryParentNode
                }
            }).then(function (response) {

                if (response) {
                    var node = response.node,
                        parentNode = response.parentNode;

                    if (editMode) {
                        var objectiveIndex;
                        if (nodeType === 'Objective') {
                            objectiveIndex = getNodeIndex(vm.tree.Objectives, node.Id);
                            vm.tree.Objectives[objectiveIndex].Name = node.Name;
                            vm.tree.Objectives[objectiveIndex].Body = node.Body;
                            vm.tree.Objectives[objectiveIndex].Completed = node.Completed;
                        } else if (nodeType === 'Key Result') {
                            var keyResultIndex = getNodeIndex(parentNode.KeyResults, node.Id);
                            objectiveIndex = getNodeIndex(vm.tree.Objectives, parentNode.Id);
                            vm.tree.Objectives[objectiveIndex].KeyResults[keyResultIndex].Name =
                                node.Name;
                            vm.tree.Objectives[objectiveIndex].KeyResults[keyResultIndex].Body =
                                node.Body;
                            vm.tree.Objectives[objectiveIndex].KeyResults[keyResultIndex].Priority =
                                node.Priority;
                            vm.tree.Objectives[objectiveIndex].KeyResults[keyResultIndex].Completed =
                                node.Completed;
                        } else {
                            var taskIndex = getNodeIndex(vm.currentKeyResult.Tasks, node.Id);
                            vm.currentKeyResult.Tasks[taskIndex].Name = node.Name;
                            vm.currentKeyResult.Tasks[taskIndex].Body = node.Body;
                            vm.currentKeyResult.Tasks[taskIndex].Priority = node.Priority;
                            vm.currentKeyResult.Tasks[taskIndex].Completed = node.Completed;
                        }
                    } else {
                        if (nodeType === 'Objective') {
                            node.KeyResults = [];
                            vm.tree.Objectives.push(node);
                        } else if (nodeType === 'Key Result') {
                            node.Tasks = [];
                            vm.currentObjective.KeyResults.push(node);
                        } else {
                            vm.currentKeyResult.Tasks.push(node);
                        }

                    }
                }
            });
        };

        function init() {
            getTree();
        }

        init();
    }

    TreeController.$inject = ['$scope', '$mdDialog', 'TreeFactory', '$stateParams', '$filter'];

    app.controller('TreeController', TreeController);
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
                    priority: keyResult.Priority,
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
                    priority: keyResult.Priority,
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
                    priority: task.Priority,
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
                    priority: task.Priority,
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
