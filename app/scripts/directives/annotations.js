'use strict';
angular.module('crackooApp').directive('annotation', [
  'UserStudyItemService',
  function (USI) {
    return {
      templateUrl: 'views/studyItem/annotations.html',
      restrict: 'AE',
      replace: true,
      scope: {
        confidence: '@',
        difficulty: '@',
        review: '@',
        inapt: '@',
        interestLevel: '@',
        hide: '@',
        uid: '@uid',
        gid: '@gid',
        id: '@id'
      },
      link: function (scope) {
        /*
             The following code watches the for the initial value of annotations as the value is fetched asynchronously
             in the study item controller.
             */
        scope.$parent.$watch('confidence', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          //alert(value);
          if (value === 'C' || value === 'NS') {
            scope.confidence = value;
            if (value === 'C') {
              scope.isConfident = scope.confidence === 'C';
            } else if (value === 'NS') {
              scope.isNotSure = scope.confidence === 'NS';
            }
          }
        });
        scope.$parent.$watch('difficulty', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.difficulty = value;
          if (value === 'D') {
            scope.isDifficult = scope.difficulty === 'D';
          } else if (value === 'E') {
            scope.isEasy = scope.difficulty === 'E';
          }
        });
        scope.$parent.$watch('needsReview', function (value) {
          if (value === 'undefined') {
            return;
          }
          scope.review = value;
          scope.needsReview = scope.review === 'review';
        });
        scope.$parent.$watch('interestLevel', function (value) {
          if (value === 'undefined') {
            return;
          }
          scope.interestLevel = value;
          if (value === 'LK') {
            scope.isLike = scope.interestLevel === 'LK';
          }  //scope.like = (scope.like === 'like');
        });
        scope.$parent.$watch('inappropriate', function (value) {
          if (value === 'undefined') {
            return;
          }
          scope.inapt = value;
          scope.inappropriate = scope.inapt === 'inapt';
        });
        scope.$parent.$watch('hide', function (value) {
          //alert(value);
          if (value === 'undefined') {
            return;
          }
          scope.hide = value;
        });
        function update() {
          scope.isConfident = scope.confidence === 'C';
          scope.isNotSure = scope.confidence === 'NS';
          scope.isEasy = scope.difficulty === 'E';
          scope.isDifficult = scope.difficulty === 'D';
          scope.isLike = scope.interestLevel === 'LK';
        }
        scope.toggle = function (value) {
          var data;
          switch (value) {
          case 'C':
            scope.confidence = 'C';
            data = { confidence: 'C' };
            USI.updateStudyItem(scope.uid, scope.gid, scope.id, data);
            break;
          case 'NS':
            scope.confidence = 'NS';
            //update the server
            data = { confidence: 'NS' };
            USI.updateStudyItem(scope.uid, scope.gid, scope.id, data);
            break;
          case 'D':
            scope.difficulty = 'D';
            //update the server
            data = { difficulty: 'D' };
            USI.updateStudyItem(scope.uid, scope.gid, scope.id, data);
            break;
          case 'E':
            scope.difficulty = 'E';
            //update the server
            data = { difficulty: 'E' };
            USI.updateStudyItem(scope.uid, scope.gid, scope.id, data);
            break;
          case 'review':
            scope.review = scope.review ? false : true;
            //update the server
            data = { needsReview: scope.review };
            USI.updateStudyItem(scope.uid, scope.gid, scope.id, data);
            break;
          case 'inapt':
            scope.inapt = scope.inapt ? false : true;
            //update the server
            data = { inappropriate: scope.inapt };
            USI.updateStudyItem(scope.uid, scope.gid, scope.id, data);
            break;
          case 'LK':
            scope.interestLevel = 'LK';
            //update the server
            data = { interestLevel: 'LK' };
            USI.updateStudyItem(scope.uid, scope.gid, scope.id, data);
            break;
          case 'hide':
            scope.hide = scope.hide ? false : true;
            //update the server
            data = { hide: scope.hide };
            USI.updateStudyItem(scope.uid, scope.gid, scope.id, data);
            break;
          }
          update();
        };
      }
    };
  }
]);
