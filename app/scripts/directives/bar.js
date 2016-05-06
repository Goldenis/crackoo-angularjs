'use strict';
angular.module('crackooApp').directive('resultBar', [
  '$q',
  function () {
    return {
      templateUrl: 'views/bar/resultBar.html',
      restrict: 'A',
      //replace : true,
      scope: {
        correct: '@',
        incorrect: '@',
        cp: '@',
        ip: '@',
        title: '@'
      },
      link: function (scope) {
        scope.total = null;
        scope.correctPr = function (correct, incorrect) {
          return (correct)/(correct + incorrect);
        };
        scope.incorrectPr = function (correct, incorrect) {
          return (incorrect)/(correct + incorrect);
        };
      }
    };
  }
]).directive('levelBar', [function () {
    return {
      templateUrl: 'views/bar/levelBar.html',
      restrict: 'A',
      replace: 'true',
      scope: {
        level: '@',
        title: '@'
      },
      link: function (scope) {
        if (scope.level !== null) {
        }
      }
    };
  }]);
