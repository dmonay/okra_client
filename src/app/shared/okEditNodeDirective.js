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
            link: linkFunc
        };

        function linkFunc(scope, iElement, iAttrs) {


            iElement.bind('click', function () {
                console.log('hello');
            });
        }
    }

    // okEditNode.$inject = [];

    app.directive('okEditNode', okEditNode);

})();
