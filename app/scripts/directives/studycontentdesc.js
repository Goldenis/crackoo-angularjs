/**
 * This directive represents the contents of a study item. If there is a study item of type questions, this directive represents the question itself.
 * The answers of a question will be another directive.
 *
 * Created by rizwanahmed on 3/2/14.
 */
'use strict';
angular.module('crackooApp').directive('studycontentdesc', [
  '$compile',
  function ($compile) {
    return {
      restrict: 'E',
      //scope : {
      //    text : '@'
      //},
      link: function (scope, element) {
        //watch the value in the parent scope
        scope.$parent.$parent.$watch('item', function (value) {
          if (typeof value === 'undefined') {
            return;
          }

          //value.description = "When $a \\ne 0$, there are two solutions to \\(ax^2 + bx + c = 0\\) and they are $$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$";

          //value.description = "$$$\\frac{3-4x}{5}$$$ ";
          element.replaceWith($compile('<div class="questionBody">' + value.description + '</div>')(scope));
        });
      }
    };
  }
]);
