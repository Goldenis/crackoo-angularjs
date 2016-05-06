'use strict';
angular.module('crackooApp').directive('timer', [
  '$timeout',
  'dateFilter',
  function ($timeout) {
    return {
      templateUrl: 'views/timer.html',
      restrict: 'A',
      link: function postLink(scope) {
        //var format = 'mm:ss';
        var totaltime = 0;
        scope.time = '00:00';
        function updateLater() {
          $timeout(function () {
            updateTime();
            if (scope.isRunning) {
              updateLater();
            }
          }, 1000);
        }
        scope.isRunning = true;
        scope.toggleClock = function () {
          scope.isRunning = scope.isRunning ? false : true;
          if (scope.isRunning) {
            updateLater();
          }
        };
        scope.finishTest = function () {
          scope.$parent.showSummary();
        };
        function updateTime() {
          totaltime += 1;
          scope.$parent.$parent.$parent.$parent.time = totaltime;
          scope.time = Math.floor(totaltime / 60 % 60) + ':' + parseInt(totaltime % 60);
        }
        updateLater();
      }
    };
  }
]);
