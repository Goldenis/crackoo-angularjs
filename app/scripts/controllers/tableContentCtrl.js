'use strict';
angular.module('crackooApp').controller('tableContentCtrl', [
  '$scope',
  '$rootScope',
  '$routeParams',
  'GoalDataService',
  'GoalService',
  function ($scope, $rootScope,$routeParams, GoalDataService, goalService) {
    $scope.tableContentView = true;
    var id = $scope.id = $routeParams.id;
    var gid = $scope.gid = ($routeParams.gid).replace(/-/g, ' ');
    var res = GoalDataService.getStudyItems(gid);
    var groups = $scope.groups = goalService.getNestedTopicList(gid);
    groups.then(function (res) {
      $scope.groups = res;
    });
    res.then(function (response) {
      res = response;
      var num = 1;
      $scope.its = res;
      /**The next item is re-calculated every time and ths is very inefficient**/
      for (var i = 0; i < res.length; i += 1) {
        if (res[i].studyItemID === id) {
          //$rootScope.cgid = res[i].goalID;
          $rootScope.cgname = res[i].goalName;
          $scope.number = num;
          $scope.item = res[i];
          $scope.title = res[i].caption;
          $scope.isDifficultStudyItem = res[i].difficulty === 'D';
          $scope.isEasyStudyItem = res[i].difficulty === 'E';
          $scope.percent = Math.floor((i + 1) * 100 / res.length);
          if (i > 0) {
            $scope.prevItem = res[i - 1].studyItemID;
          }
          if (i + 1 < res.length) {
            $scope.nextItem = res[i + 1].studyItemID;
          }
          if (i === 0) {
            $scope.prevItem = 'start';
          }
          if (i === res.length - 1) {
            $scope.nextItem = 'end';
          }
          break;
        }
        num += 1;
      }
      $scope.headerMessage = 'Table of Contents';
      $scope.q_main = 'views/studyItem/main.html';
      var goals = goalService.getGoal(gid);
      goals.then(function (res) {
        $scope.course = res;
      });
    });
    $scope.q_question = '';
    $scope.current_view = $scope.q_question;
  }
]);
