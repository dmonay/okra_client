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
