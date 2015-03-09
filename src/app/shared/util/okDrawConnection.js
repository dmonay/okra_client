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
