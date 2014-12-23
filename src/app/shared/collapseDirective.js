(function () {
    'use strict';

    var app = angular.module('SharedDirectives');

    function okCollapse($animate) {
        return {
            restrict: 'A',
            link: linkFunc,
            scope: {
                linkedTo: '@'
            }
        };

        function replaceClass(oldClass, newClass, element) {
            element.addClass(newClass);
            element.removeClass(oldClass);
        }

        function linkFunc(scope, iElement, iAttrs) {
            var allNodes = ['organizationNode', 'objectiveNode', 'keyResultNode', 'taskNode'],
                thisNode = angular.element(document.getElementById(scope.linkedTo));

            iElement.bind('click', function () {
                var isPlus = iElement.find('i').hasClass('fa-plus');
                //On click replace class extrapolate this instead of using ng-class, cleaner html
                if (iElement.find('i').hasClass('fa-minus')) {
                    replaceClass('fa-minus', 'fa-plus', iElement.find('i'));
                    replaceClass('md-warn', 'md-primary', iElement);
                } else {
                    replaceClass('fa-plus', 'fa-minus', iElement.find('i'));
                    replaceClass('md-primary', 'md-warn', iElement);
                }
                var node,
                    i = allNodes.indexOf(scope.linkedTo) + 1;
                //hide all nodes
                for (i; i < allNodes.length; i++) {
                    node = angular.element(document.getElementById(allNodes[i]));
                    if (allNodes[i] !== scope.linkedTo && isPlus) {
                        $animate.removeClass(node, 'collapse');
                        i = allNodes.length;
                    }
                    if (!isPlus) {
                        $animate.addClass(node, 'collapse');
                    }
                    scope.$apply();
                }
            });
        }
    }

    okCollapse.$inject = ['$animate'];

    app.directive('okCollapse', okCollapse);

})();
