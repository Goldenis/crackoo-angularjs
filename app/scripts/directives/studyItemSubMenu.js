'use strict';
angular.module('crackooApp').directive('studyItemSubMenu', [
  '$location',
  function () {
    return {
      templateUrl: 'views/studyItem/subNavigation.html',
      restrict: 'E',
      scope: {
        switchTab: '&',
        isTabSelected: '&'
      },
      transclude: true,
      link: function postLink() {
      }
    };
  }
]);
