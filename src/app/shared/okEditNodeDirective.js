(function () {
    'use strict';

    var app = angular.module('SharedDirectives');

    /**
     * @ngdoc directive
     * @name SharedDirectives.directive:ok-edit-node
     * @restrict A
     *
     * @description
     * `ok-edit-node`
     *
     * Used for editing nodes should be placed in the same HTML hierachy of an element with the class
     * of 'tree-node'.
     * @usage
     *
     *  <div class="tree-node"></div>
     *  <div layout="column" layout-align="start end" ok-edit-node>
     *      <md-button href class="md-raised md-primary" aria-label="edit">
     *          <i class="fa fa-pencil"></i>
     *      </md-button>
     *  </div>
     */

    function okEditNode() {
        return {
            restrict: 'A',
            link: linkFunc,
            scope: {
                edit: '@',
                cancel: '@',
                save: '@',
                node: '='
            }
        };

        function linkFunc(scope, iElement, iAttrs) {
            var saveButton;
            scope.node.isEditMode = false;

            function switchToEdit() {
                scope.node.newName = '';
                scope.node.isEditMode = !scope.node.isEditMode;
                scope.$apply();
            }

            function saveEdit() {
                if (scope.node.newName.length > 0) {
                    scope.node.Name = scope.node.newName;
                    switchToEdit();
                }
            }

            _.each(iElement.children(), function (child) {
                var childNode = angular.element(child);

                if (childNode.find('i').hasClass(scope.cancel) || childNode.find('i').hasClass(
                        scope.edit)) {
                    childNode.bind('click', switchToEdit);
                }

                if (childNode.find('i').hasClass(scope.save)) {
                    childNode.bind('click', saveEdit);
                    childNode.attr('disabled', 'disabled');
                    saveButton = childNode;
                }
            });

            scope.$watch(
                function () {
                    return scope.node.newName;
                },
                function (newName) {
                    if (newName !== undefined && newName.length > 0 && saveButton) {
                        saveButton.removeAttr('disabled');
                    } else if (saveButton) {
                        saveButton.attr('disabled', 'disabled');
                    }
                }
            );
        }
    }

    // okEditNode.$inject = [];

    app.directive('okEditNode', okEditNode);

})();
