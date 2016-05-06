'use strict';
angular.module('crackooApp').directive('greenBar', [
  'authService',
  '$rootScope',
  '$timeout',
  function (authService, $rootScope) {
    var gdo = {
      templateUrl: 'views/greenbar.html',
      restrict: 'A',
      replace: true,
      transclude: true,
      scope: {
        name: '@',
        id: '@',
        isTimerVisible: '@',
        gid: '@',
        activeTab: '@',
        caption: '@'
      },
      link: function postLink(scope) {
        scope.isGoalPage = $rootScope.isGoalPage;
        scope.headerTitle = scope.caption;
        /**log out the user and redirect to home page **/
        scope.logout = function () {
          authService.logout();
        };
        //set header caption
        scope.$watch('caption', function (newValue, OldValue, scope) {
          if (newValue) {
            scope.headerTitle = scope.caption;
          }
        });
        /** Set the user first name on the green bar**/
        scope.$watch(function () {
          return authService.session;
        }, function (data) {
          if (data.displayName !== null) {
            scope.first_name = data.displayName;
          }
        }, true);
        scope.selectTab = function (tabName) {
          scope.activeTab = tabName;
        };
      }
    };
    return gdo;
  }
]);
