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
	            //On click replace class extrapolate this instead of using ng-class, cleaner
                iElement.find('i').hasClass('fa-minus') ? 
	                replaceClass('fa-minus', 'fa-plus', iElement.find('i')) :  replaceClass('fa-plus', 'fa-minus', iElement.find('i'));
	            //hide all nodes
	            for(var i = 0; i < allNodes.length; i++) {
	            	var node = angular.element(document.getElementById(allNodes[i]));
	            	$animate.addClass(node, '.collapse');
	            }
            });
        }
    }

    okCollapse.$inject = ['$animate'];

    app.directive('okCollapse', okCollapse);

})();
