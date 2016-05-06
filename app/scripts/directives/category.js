'use strict';
angular.module('crackooApp').directive('category', [
  '$location',
  function () {
    return {
      templateUrl: 'views/category.html',
      restrict: 'E',
      scope: {
        text: '@',
        selected: '='
      },
      link: function postLink() {
      }
    };
  }
]);
