'use strict';
angular.module('crackooApp').directive('questionHeader', [
  '$location',
  function ($location) {
    return {
      templateUrl: 'views/studyItem/questionHeader.html',
      restrict: 'E',
      scope: {
        headerMessage: '@',
        showResult: '@',
        backHandler: '&',
        istablecontent: '=',
        gid: '=',
        id: '='
      },
      link: function postLink(scope) {
        console.log('gid = ', scope.gid);
        console.log('id = ', scope.id);
        scope.backToStudy = function () {
          if (scope.showResult) {
            scope.backHandler();
            if (scope.istablecontent) {
              $location.path('/goals/' + (scope.gid).replace(/\s+/g, '-') + '/items/' + scope.id);
            } else {
              $location.path('/goals/' + (scope.gid).replace(/\s+/g, '-') + '/tableContents/' + scope.id);
            }
          }
        };
      }
    };
  }
]);
