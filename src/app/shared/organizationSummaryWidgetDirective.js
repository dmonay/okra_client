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
            templateUrl: 'app/shared/organization-summary-widget.tpl.html'
        };

        // function linkFunc(scope, iElement, iAttrs) {

        // }
    }

    // organizationSummaryWidget.$inject = [];

    app.directive('organizationSummaryWidget', organizationSummaryWidget);

})();
