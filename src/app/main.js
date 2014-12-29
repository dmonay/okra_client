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
        angular.bootstrap(document, ['okra']);
    });

    /**
     * Theme Configuration
     */
    app.config(function ($mdThemingProvider) {
        $mdThemingProvider.setDefaultTheme('okra');
    });

    //Constants
    app.constant('okraAPI', {
        createOrg: 'http://localhost:8080/create/organization',
        updateMission: 'http://localhost:8080/update/mission/',
        updateMembers: 'http://localhost:8080/update/members/',
        createTree: 'http://localhost:8080/create/tree/',
        getTreesInOrg: 'http://localhost:8080/get/trees/',
        getSingleTreeInOrg: 'http://localhost:8080/get/trees/' //ORG/TREEID
    });
})();

(function () {
    'use strict';

    var router = angular.module('okra.routes', ['ui.router']);

    router.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('organization/tree', {
                url: '/organization/:organization/tree/:treeId',
                templateUrl: 'app/organization/organization-tree.tpl.html',
                controller: 'OrganizationController as vm'
            })
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

    function MissionStatementModalController($scope, OrganizationFactory, $mdDialog, missionStatement) {
        var modal = this;

        modal.missionStatement = missionStatement;
        modal.formSubmitted = false;

        modal.saveMissionStatement = function () {
            modal.formSubmitted = true;
            if (modal.missionStatementForm.$valid) {
                var hardCodedOrg = 'someorg';
                modal.currentlySaving = true;
                OrganizationFactory.updateMission(hardCodedOrg, modal.newMissionStatement)
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

    MissionStatementModalController.$inject = ['$scope', 'OrganizationFactory', '$mdDialog', 'missionStatement'];

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

        TreeFactory.getTrees('someorg').then(function (reponse) {
            console.log(response);
        });


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
    }

    OrganizationController.$inject = ['$scope', '$mdDialog', 'TreeFactory'];

    app.controller('OrganizationController', OrganizationController);

})();

(function () {
    'use strict';

    var app = angular.module('OrganizationModule');

    function OrganizationMembersModalController($scope, OrganizationFactory, $mdDialog, members, MemberService) {
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

                OrganizationFactory.updateMembers('someorg', newMembersArray).then(function (response) {
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

    function OrganizationFactory($http, okraAPI) {
        var organizationAPI = {
            createOrganization: function (orgName) {
                return $http.post(okraAPI.createOrg, {
                    organization: orgName,
                    userId: "5491e2aebee23fc7375b789c"
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

(function () {
    'use strict';

    /**
     * @ngdoc directive
     * @name okCollapse
     *
     * @restrict A
     *
     * @description
     * `ok-collapse`
     * @param {string=} linked-to Required by the directive to know which container/node it is linked to
     * @param {binding=} all-linked-nodes Array required by the directive to keep track of all collapsable units
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

    function MemberService() {
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
     * @name okToggleColor
     *
     * @restrict A
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
    $templateCache.put("app/organization/mission-statement-modal.tpl.html",
        "<md-dialog flex=\"30\"><div layout=\"row\" layout-align=\"center\"><md-subheader><h3>Mission Statement</h3></md-subheader></div><div layout=\"row\" layout-align=\"center center\">{{modal.missionStatement}}</div><md-content><form name=\"modal.missionStatementForm\"><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-input-group class=\"long\"><label>New Mission Statement</label><md-input required name=\"newMissionStatement\" ng-model=\"modal.newMissionStatement\" autocapitalize=\"off\"></md-input></md-input-group></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"modal.formSubmitted && modal.missionStatementForm.newMissionStatement.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div></form><md-content><div class=\"md-actions\" style=\"border-top: none\" layout=\"row\" layout-align=\"center end\"><md-button class=\"md-raised md-warn\" ng-click=\"modal.closeModal()\" aria-label=\"cancel\">Cancel</md-button><md-button class=\"md-raised md-primary\" ng-click=\"modal.saveMissionStatement()\" aria-label=\"add\">Save</md-button><md-progress-circular ng-if=\"modal.currentlySaving\" md-mode=\"indeterminate\" md-diameter=\"20\"></md-progress-circular></div><md-dialog></md-dialog></md-content></md-content></md-dialog>"
    );
    $templateCache.put("app/organization/organization-members-modal.tpl.html",
        "<md-dialog flex=\"50\"><div layout=\"row\" layout-align=\"center\"><md-subheader><h3>Organization Members</h3></md-subheader></div><div layout=\"row\" layout-align=\"start center\"><ul class=\"list-horizontal\"><li ng-repeat=\"member in modal.members\"><h3>{{member.userName}}</h3><span class=\"sub-text\">{{member.role}}</span></li></ul></div><md-content><form class=\"form-horizontal\" name=\"modal.newMemberForm\"><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-input-group class=\"long\"><label>Username</label><md-input required name=\"newUserName\" ng-model=\"modal.newUser.name\" autocapitalize=\"off\"></md-input></md-input-group></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"modal.formSubmitted && modal.newMemberForm.newUserName.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div><div layout=\"row\" layout-align=\"center center\"><div layout-align=\"start start\"><md-input-group class=\"long\"><label>Role</label><md-input required name=\"newUserRole\" ng-model=\"modal.newUser.role\" autocapitalize=\"off\"></md-input></md-input-group></div><div class=\"error-msg ng-hide\" layout-align=\"center end\" ng-show=\"modal.formSubmitted && modal.newMemberForm.newUserRole.$invalid\" ng-cloak><i class=\"fa fa-warning\"></i><md-tooltip>This field is required</md-tooltip></div></div></form><md-content><div class=\"md-actions\" style=\"border-top: none\" layout=\"row\" layout-align=\"center center\"><md-button class=\"md-raised md-warn\" ng-click=\"modal.closeModal()\" aria-label=\"cancel\">Close</md-button><md-button class=\"md-raised md-primary\" ng-click=\"modal.addMember()\" aria-label=\"add\">Add Member</md-button><md-progress-circular ng-if=\"modal.currentlySaving\" md-mode=\"indeterminate\" md-diameter=\"20\"></md-progress-circular></div><md-dialog></md-dialog></md-content></md-content></md-dialog>"
    );
    $templateCache.put("app/organization/organization-tree.tpl.html",
        "<section class=\"organization-wrapper\"><div class=\"organization active\" layout=\"row\" layout-align=\"center\" id=\"organizationNode\"><div class=\"tree-node\">Organization #1</div><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised md-primary\" ok-collapse ok-toggle-color linked-to=\"organizationNode\" all-linked-nodes=\"vm.linkedNodeIds\" aria-label=\"toggle\"><i class=\"fa fa-plus\"></i></md-button><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div><div layout=\"column\" layout-align=\"start end\"><md-button class=\"md-raised md-primary\" ng-click=\"vm.openOrganizationMembersModal()\" aria-label=\"members\"><i class=\"fa fa-users\"></i></md-button><md-button class=\"md-raised md-primary\" ng-click=\"vm.openMissionStatementModal()\" aria-label=\"mission statement\"><i class=\"fa fa-briefcase\"></i></md-button></div></div><div layout=\"row\" class=\"collapse\" layout-align=\"center center\" id=\"objectiveNode\"><div class=\"objective\" layout=\"row\" layout-align=\"start\" ng-repeat=\"objective in [1, 2, 3, 4]\"><div class=\"tree-node\" layout-align=\"start\">Objective {{$index + 1}}</div><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised\" ok-collapse ok-toggle-color linked-to=\"objectiveNode\" all-linked-nodes=\"vm.linkedNodeIds\" aria-label=\"toggle\"><i class=\"fa fa-plus\"></i></md-button><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div></div></div><div layout=\"row\" class=\"collapse\" layout-align=\"center center\" id=\"keyResultNode\"><div class=\"key-result\" layout=\"row\" layout-align=\"start\"><div class=\"tree-node\">Key Result #1</div><div layout=\"column\" layout-align=\"end end\"><md-button href class=\"md-raised\" ok-collapse ok-toggle-color linked-to=\"keyResultNode\" all-linked-nodes=\"vm.linkedNodeIds\" aria-label=\"toggle\"><i class=\"fa fa-plus\"></i></md-button><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div></div><div class=\"key-result\" layout=\"row\" layout-align=\"start\"><div class=\"tree-node\">Key Result #2</div><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised\" ok-collapse ok-toggle-color linked-to=\"keyResultNode\" all-linked-nodes=\"vm.linkedNodeIds\" aria-label=\"toggle\"><i class=\"fa fa-plus\"></i></md-button><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div></div></div><div layout=\"column\" class=\"collapse\" ok-collapse linked-to=\"taskNode\" layout-align=\"space-around center\" all-linked-nodes=\"vm.linkedNodeIds\" id=\"taskNode\"><div layout=\"row\" layout-align=\"start center\" ng-repeat=\"task in [1, 2, 3, 4]\"><md-checkbox ng-model=\"vm.isChecked[$index]\" aria-label></md-checkbox><div class=\"task-node\">Task {{$index + 1}}</div></div></div></section>"
    );
    $templateCache.put("app/organization/organization-trees-selection.tpl.html",
        "<section class=\"organization-wrapper\"><div class=\"organization active\" layout=\"row\" layout-align=\"center\" id=\"organizationNode\"><div class=\"tree-node\">Organization #1</div><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised md-primary\" ok-collapse ok-toggle-color linked-to=\"organizationNode\" all-linked-nodes=\"['organizationNode', 'treesNode']\" aria-label=\"toggle\"><i class=\"fa fa-plus\"></i></md-button><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div><div layout=\"column\" layout-align=\"start end\"><md-button class=\"md-raised md-primary\" ng-click=\"vm.openOrganizationMembersModal()\" aria-label=\"members\"><i class=\"fa fa-users\"></i></md-button><md-button class=\"md-raised md-primary\" ng-click=\"vm.openMissionStatementModal()\" aria-label=\"mission statement\"><i class=\"fa fa-briefcase\"></i></md-button></div></div><div layout=\"column\" style=\"max-height: 100000px\" class=\"collapse\" id=\"treesNode\"><div layout=\"row\" layout-align=\"center center\" ng-repeat=\"treeRow in [1, 2, 3, 4]\"><div class=\"objective\" layout=\"row\" layout-align=\"start\" ng-repeat=\"node in [1, 2, 3, 4]\"><div class=\"tree-node\">Objective {{$index + 1}}</div><div layout=\"column\" layout-align=\"start end\"><md-button href class=\"md-raised md-primary\" aria-label=\"edit\"><i class=\"fa fa-pencil\"></i></md-button></div></div></div></div></section>"
    );
}]);
