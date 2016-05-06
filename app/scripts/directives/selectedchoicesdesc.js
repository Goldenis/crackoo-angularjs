/**
 * This directive represents the contents of a study item. If there is a study item of type questions, this directive represents the question itself.
 * The answers of a question will be another directive.
 *
 * Created by rizwanahmed on 3/2/14.
 */
'use strict';
angular.module('crackooApp').directive('selectedchoicesdesc', [
  '$compile',
  function ($compile) {
    return {
      restrict: 'E',
      scope : {
          text : '='
      },
      template: '<div id="selectedAnswer">{{ce}}</div>',
      link: function (scope, element) {
        //watch the value in the parent scope
        scope.$watch('text', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          //element.replaceWith($compile('<div ng-class="explanationBody"> <p> <b>' + scope.text + '</b> </p> </div>')(scope));
          scope.ce = $compile('<div ng-class="explanationBody"> <p> <b>' + value + '</b> </p> </div>')(scope);
          scope.ce = scope.ce.html();
          console.log(scope.ce);
          angular.element(document).find('#selectedAnswer').html(scope.ce);
          //element.replaceWith($compile('<div ng-class="explanationBody"> <p> <b>' + value + '</b> </p> </div>')(scope));
          //angular.element.find('.selectedAnswer').css();
          //element.replaceWith($compile('<div ng-class="explanationBody"> <p> <b>' + value + '</b> </p> </div>')(scope));
        });
//scope.$watch('text', function (value) { scope.ctext = $compile(scope.text); console.log(value); });
        //scope.ctext = $compile(scope.text)(scope);
      }
    };
  }
]);
