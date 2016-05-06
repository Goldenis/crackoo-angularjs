'use strict';
angular.module('crackooApp').directive('header', [
  '$rootScope',
  'authService',
  'GoalDataService',
  '$location',
  function ($rootScope, AuthService, GoalDataService, $location) {
    return {
      templateUrl: 'views/header.html',
      restrict: 'A',
      replace: true,
      scope: {
        rgid: '@',
        rgname: '@'
      },
      link: function (scope) {
        /**log out the user and redirect to home page **/
        scope.logout = function () {
          AuthService.logout();
        };
        /** Set the user first name on the green bar**/
        scope.$watch(function () {
          return AuthService.session;
        }, function (data) {
          if (data !== null) {
            scope.first_name = data.displayName;
            scope.imgUrl = data.imgUrl;
          }
        }, true);
        /** Watch for change in value of the current goal. FIXME should possibly change this to observer pattern **/
        scope.$watch(GoalDataService.getCurrentGoal, function (value) {
          if (typeof value === 'undefined' || value === null) {
            return;
          }
          scope.rgname = value.name;
          scope.rgid = value.goalID;
          scope.isReportVisible = true;
        });
        scope.showReports = function () {
          if (scope.isReportVisible === true) {
            return true;
          } else {
            var value = GoalDataService.getCurrentGoal;
            if (typeof value === 'undefined' || value === null) {
              return false;
            } else {
              scope.rgid = value.goalID;
              return true;
            }
          }
        };
        /** Navigate to the the Study Item Page for this Goal**/
        scope.navigateToStudyItemPage = function () {
          var res = GoalDataService.getStudyItems();
          $location.path('goals/' + scope.rgid + '/items/' + res[0].studyItemID);
        };
        /** Navigate to the Home Page **/
        scope.navigateToHomePage = function () {
          $location.path('/');
        };
      }
    };
  }
]);
