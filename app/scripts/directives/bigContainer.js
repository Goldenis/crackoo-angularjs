'use strict';
angular.module('crackooApp').directive('bigContainer', [
  '$route',
  function ($route) {
    return {
      priority: '1',
      restrict: 'A',
      link: function postLink(scope, element, attr) {
        function update() {
          var className = $route.current && $route.current.className;
          if (className) {
            attr.$set('class', className);
          } else {
            attr.$set('class', '');
          }
        }
        scope.$on('$routeChangeSuccess', update);
      }
    };
  }
]);
