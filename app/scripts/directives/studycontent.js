/**
 * This directive represents the contents of a study item. If there is a study item of type questions, this directive represents the question itself.
 * The answers of a question will be another directive.
 *
 * Created by rizwanahmed on 3/2/14.
 */
'use strict';
angular.module('crackooApp').directive('studycontent', ['$timeout', function ($timeout) {
    return {
      templateUrl: 'views/studyItem/question.html',
      restrict: 'EA',
      replace: true,
      scope: {
        item: '=',
        attempts: '@',
        correctcount: '@',
        current_view: '@',
        questionHeaderText: '@',
        totalStudyItemStudyTime: '=',
        switchTab: '&',
        uid: '@uid',
        gid: '@gid',
        id: '@id',
        istablecontent: '=',
        groups: '=',
        author: '='
      },
      link: function (scope) {
        scope.showResult = false;
        scope.hiddenContainer = false;
        
        //watch the value in the controller
        scope.$parent.$watch('item', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.item = value;
          /*if (!scope.$$phase) {
            scope.$apply();
          }*/
          $timeout(function() {
            scope.hiddenContainer = true;
          }, 700 , false);          
        });
        //watch the value in the controller
        scope.$parent.$watch('current_view', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.current_view = value;
        });
        console.log('tcv = ', scope.istablecontent);
        if (scope.istablecontent) {
          scope.containerId = 'questionStepLeft';
        } else {
          scope.containerId = 'questionFullWidthPanel';
        }
        //watch the value in the controller
        scope.$watch('showResult', function (value) {
          if (value === true || (typeof scope.$parent.item != 'undefined' && scope.$parent.item.studyItemType === 'F')) {
            scope.containerId = 'questionStepLeft';
          } else {
            if (scope.istablecontent) {
              scope.containerId = 'questionStepLeft';
            } else {
              scope.containerId = 'questionFullWidthPanel';
            }
          }
        });
        //listen for answers attribute in the parent controller
        scope.$parent.$watch('correct', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.correctcount = value;
        });
        //listen for answers attribute in the parent controller
        scope.$parent.$watch('correct', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.correctcount = value;
        });
        //listen for answers attribute in the parent controller
        scope.$parent.$watch('attempts', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.attempts = value;
        });
        scope.$watch('item.studyItemType', function (value) {
          if (value === 'F') {
            scope.containerId = 'questionflashCard';
          } else {
            if (scope.showResult === true) {
              scope.containerId = 'questionStepLeft';
            } else {
              if (scope.istablecontent) {
                scope.containerId = 'questionStepLeft';
              } else {
                scope.containerId = 'questionFullWidthPanel';
              }
            }
          }
        });
        scope.showStudyItem = function () {
          scope.showResult = false;
        };
      }
    };
  }]);
