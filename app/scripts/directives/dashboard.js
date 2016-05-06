'use strict';
angular.module('crackooApp').directive('studyPlans', [function () {
    return {
      templateUrl: 'views/dashboard/study_plans.html',
      restrict: 'A',
      replace: true,
      scope: { goals: '@' }
    };
  }]).directive('progressSummary', [function () {
    return {
      templateUrl: 'views/dashboard/progress_summary.html',
      restrict: 'A',
      replace: true,
      scope: { reports: '@' }
    };
  }]).directive('friendsActivity', [function () {
    return {
      templateUrl: 'views/dashboard/friends_activity.html',
      restrict: 'A',
      replace: true,
      scope: { friends: '@' }
    };
  }]).directive('pquestions', [function () {
    return {
      templateUrl: 'views/dashboard/questions.html',
      restrict: 'A',
      replace: true,
      scope: { qs: '@' }
    };
  }]);
