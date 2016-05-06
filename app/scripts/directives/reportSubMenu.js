'use strict';
angular.module('crackooApp').directive('reportSubMenu', [
  '$location',
  function () {
    return {
      templateUrl: 'views/reportSubNavigation.html',
      restrict: 'E',
      scope: { type: '=' },
      transclude: true,
      link: function postLink() {
      }
    };
  }
]);
