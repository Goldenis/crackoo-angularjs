'use strict';
angular.module('crackooApp').directive('questionResult', [
  '$location',
  function () {
    return {
      templateUrl: 'views/studyItem/questionResult.html',
      restrict: 'E',
      replace: true,
      scope: {
        selectedChoice: '@',
        correctAnswers: '@',
        explanation: '@'
      },
      link: function postLink(scope) {

        //scope.$parent.$parent.$parent.$watch('selectedChoiceDesc', function (value) {
        //  if (value === 'undefined') {
        //    return;
        //  }
        //  scope.selectedChoice = value;
        //  //console.log(value);
        //  if (scope.selectedChoice === scope.rightAnswer) {
        //    scope.correctAns = true;
        //  } else {
        //    scope.correctAns = false;
        //  }
        //});
        //$(selectedChoice).not(correctAnswers).length === 0 && $(correctAnswers).not(selectedChoice).length === 0
        scope.$parent.$parent.$parent.$watch('selectedChoice', function (value) {
          if (value === undefined) {
            return;
          }
          console.log(value);
          scope.selectedChoice = value;
          scope.correctAns = false;

          if(scope.correctAnswers === undefined){
            return;
          }
          var totalCorrect = 0;
          if(scope.selectedChoice.length  == scope.correctAnswers.length) {
            angular.forEach(scope.selectedChoice, function (object, index) {
              angular.forEach(scope.correctAnswers, function (object1, index1) {
                if(object.id ==  object1.id){
                  totalCorrect++;
                }

                if(totalCorrect == scope.correctAnswers.length){
                  scope.correctAns = true;
                }
              });
            });
          }

          //if (scope.selectedChoice === scope.correctAnswers) {
          //  scope.correctAns = true;
          //} else {
          //  scope.correctAns = false;
          //}
        }, true);

        scope.$parent.$parent.$parent.$watch('correctAnswers', function (value) {
          if (value === 'undefined') {
            return;
          }
          scope.correctAnswers = value;
        });
        scope.$parent.$parent.$parent.$watch('explanation', function (value) {
          if (value === 'undefined') {
            return;
          }
          scope.explanation = value;
        });
      }
    };
  }
]);
