'use strict';
angular.module('crackooApp').directive('appFooter', [
  '$location',
  function () {
    return {
      templateUrl: 'views/footer.html',
      restrict: 'A',
      link: function postLink() {
      }
    };
  }
]);
