'use strict';
angular.module('crackooApp').directive('questionNew', [
  '$location',
  function () {
    return {
      templateUrl: 'views/studyItem/questionNew.html',
      restrict: 'E',
      replace: true,
      scope: {
        item: '@',
        answers: '@',
        showResult: '@',
        questionHeaderText: '@',
        uid: '@uid',
        gid: '@gid',
        id: '@id',
        onBack: '&',
        istablecontent: '=',
        groups: '=',
        author: '='
      },
      link: function postLink(scope) {
        scope.$parent.$watch('item', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.item = value;
        });
        scope.$parent.$watch('answers', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          console.log('istablecontent = ', scope.groups);
          scope.answers = value;
        });
      }
    };
  }
]);
