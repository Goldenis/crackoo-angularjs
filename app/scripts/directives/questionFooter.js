'use strict';
angular.module('crackooApp').directive('questionFooter', [
  '$location',
  'UserStudyItemService',
  function ($location, USI) {
    return {
      templateUrl: 'views/studyItem/questionFooter.html',
      restrict: 'E',
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
      link: function postLink(scope) {
        jQuery(document).ready(function ($) {
          /*Bind click event of the switch elements*/
          $('.cb-enable').click(function () {
            var parent = $(this).parents('.switch');
            $('.cb-disable', parent).removeClass('selected');
            $(this).addClass('selected');
            $('.checkbox', parent).attr('checked', true);
          });
          $('.cb-disable').click(function () {
            var parent = $(this).parents('.switch');
            $('.cb-enable', parent).removeClass('selected');
            $(this).addClass('selected');
            $('.checkbox', parent).attr('checked', false);
          });
        });
        /*
                 The following code watches the for the initial value of annotations as the value is fetched asynchronously
                 in the study item controller.
                 */
        scope.$parent.$parent.$parent.$parent.$watch('confidence', function (value) {
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
        scope.$parent.$parent.$parent.$parent.$watch('difficulty', function (value) {
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
        scope.$parent.$parent.$parent.$parent.$watch('needsReview', function (value) {
          if (value === 'undefined') {
            return;
          }
          scope.review = value;
          scope.needsReview = value;
        });
        scope.$parent.$parent.$parent.$parent.$watch('interestLevel', function (value) {
          if (value === 'undefined') {
            return;
          }
          scope.interestLevel = value;
          //if (value === 'LK'){
          scope.isLike = scope.interestLevel === 'LK';  //}
                                                        //scope.like = (scope.like === 'like');
        });
        scope.$parent.$parent.$parent.$parent.$watch('inappropriate', function (value) {
          if (value === 'undefined') {
            return;
          }
          scope.inapt = value;
          scope.inappropriate = scope.inapt === 'inapt';
        });
        scope.$parent.$parent.$parent.$parent.$watch('hide', function (value) {
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
        var data;
        scope.toggle = function (value) {
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
            scope.isLike = scope.isLike ? false : true;
            if (scope.isLike) {
              scope.interestLevel = 'LK';
            } else {
              scope.interestLevel = 'null';
            }
            //update the server
            data = { interestLevel: scope.interestLevel };
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
