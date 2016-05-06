'use strict';
angular.module('crackooApp').directive('answerOption', [
  '$location',
  function () {
    return {
      templateUrl: 'views/studyItem/answerOption.html',
      restrict: 'E',
      scope: {
        answers:'=',
        explanation: '@',
        correct: '@',
        text: '@',
        active: '=',
        id: '@'
      },
      link: function postLink(scope, element, attrs) {
        if (scope.correct === 'true') {

          //scope.$parent.$parent.$parent.$parent.correctAnswer = scope.text;
          scope.$parent.$parent.$parent.$parent.explanation = scope.explanation;
        }

        //listen for selected choice attribute in the parent controller
        //scope.$parent.$parent.$parent.$parent.$watch('selectedChoiceId', function (value) {
        //  if (typeof value === 'undefined') {
        //    return;
        //  }
        //  scope.active = scope.id === scope.$parent.$parent.$parent.$parent.selectedChoiceId;
        //});

        //scope.selectAnswer = function () {
        //    //alert(scope.id);
        //    if (scope.ansSubmitted) {
        //      return;
        //    }
        //  //Set the selected choice in the parent directive as the submit button belongs to the parent directive
        //  scope.$parent.$parent.$parent.$parent.selectedChoiceId = scope.id;
        //
        //  scope.$parent.$parent.$parent.$parent.selectedChoiceDesc = scope.text;

        //  scope.active = (scope.id == scope.$parent.$parent.selectedChoiceId);
        //  alert ("this choice is active");
        //                      if(scope.active)
        //                          scope.active = false;
        //                      else
        //                          scope.active = true;
        //};

        //get correctanswers in array
        scope.$parent.$parent.$parent.$parent.correctAnswers = [];
        angular.forEach(scope.$parent.$parent.answers, function (object, index) {
          if(object.correct == true){
            //console.log("correctanswer",scope.$parent.$parent.$parent.$parent.correctAnswers);
            scope.$parent.$parent.$parent.$parent.correctAnswers.push({
              id: object.choiceID,
              rightAnswer: object.description
            })
          }
          //console.log("correctanswer",scope.$parent.$parent.$parent.$parent.correctAnswers);
        });


      //get count of correct answers and correctanswers in array
        var ansCount = 0;
        angular.forEach(scope.$parent.$parent.answers, function (object, index) {
          if(object.correct == true){
            ansCount++;

          }
        });
        //console.log(ansCount);


        //multiple selection code
        scope.$parent.$parent.$parent.$parent.selectedChoice =[];
        scope.selectAnswer = function () {
            //alert(scope.id);
            if (scope.ansSubmitted) {
              return;
            }

            console.log(scope.text);

            scope.$parent.$parent.$parent.$parent.selectedObj = {
             'selectedChoiceId' : scope.id,
             'selectedChoiceDesc' : scope.text
            };

            //scope.active = scope.id === scope.$parent.$parent.$parent.$parent.selectedObj.selectedChoiceId;
            var correctAns = ansCount;
            //var correctAns = 2;
            var matchId = true;
            angular.forEach(scope.$parent.$parent.$parent.$parent.selectedChoice, function (object, index) {
                if (object.id == scope.id) {

                  var removable = scope.$parent.$parent.$parent.$parent.selectedChoice[index];
                  angular.forEach(scope.$parent.$parent.answers, function (object, index) {
                    if(removable.id == object.choiceID){
                      scope.$parent.$parent.answers[index].active = false;
                    }
                  });

                  scope.$parent.$parent.$parent.$parent.selectedChoice.splice(index, 1);
                  scope.active = !scope.active;
                  return matchId = false;
                }
            });

            if (scope.$parent.$parent.$parent.$parent.selectedChoice.length >=  correctAns) {

              var indexToRemove = 0;
              var numberToRemove = 1;
              //scope.$parent.$parent.$parent.$parent.selectedChoice[indexToRemove].active = false;
              var removable = scope.$parent.$parent.$parent.$parent.selectedChoice[indexToRemove];
              angular.forEach(scope.$parent.$parent.answers, function (object, index) {
                if(removable != null && removable.id == object.choiceID){
                  scope.$parent.$parent.answers[index].active = false;
                }
              });
                scope.$parent.$parent.$parent.$parent.selectedChoice.splice(indexToRemove, numberToRemove);

                //console.log("after splice 1stelement", scope.$parent.$parent.$parent.$parent.selectedChoice);
            }

            if (matchId) {
                  scope.active = scope.id === scope.$parent.$parent.$parent.$parent.selectedObj.selectedChoiceId;
                   //console.log("active",scope.active);
                   console.log(scope.$parent.$parent.$parent.$parent.selectedObj.selectedChoiceDesc);
                  scope.$parent.$parent.$parent.$parent.selectedChoice.push({
                    id: scope.$parent.$parent.$parent.$parent.selectedObj.selectedChoiceId,
                    text: scope.$parent.$parent.$parent.$parent.selectedObj.selectedChoiceDesc
                  })
            }
            //console.log("Final Array", scope.$parent.$parent.$parent.$parent.selectedChoice);

          };




        }
    };
  }
]);
