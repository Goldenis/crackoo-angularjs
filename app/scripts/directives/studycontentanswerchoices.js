/**
 * This directive represents the contents of a study item. If there is a study item of type questions, this directive represents the question itself.
 * The answers of a question will be another directive.
 *
 * Created by rizwanahmed on 3/2/14.
 */
'use strict';
angular.module('crackooApp').directive('studycontentanswerchoices', [
  'ChoiceService',
  'UserStudyItemService',
  '$timeout',
  function (choices, USI, $timeout) {
    return {
      templateUrl: 'views/studyItem/answers.html',
      restrict: 'EA',
      //replace : true,
      scope: {
        showResult: '@',
        itemType: '=',
        answers: '=',
        isAnswerDescriptionCollapsed: '=isAnswerDescriptionCollapsed',
        sid: '@',
        gid: '@gid',
        uid: '@uid',
        //selectedChoiceId: '@',
        selectedChoice:'@',
        attempts: '=',
        chArr : '@'
      },
      link: function (scope) {
        /*Labels for answer choices*/
        scope.chArr = [
          'A',
          'B',
          'C',
          'D',
          'E'
        ];
        scope.displayAns = 'false';
        //the value is set to true once the answer is submitted. After this the submit button will no longer be visible
        //var ansSubmitted = scope.ansSubmitted = false;
        //                scope.ansSelected = '';
        //listen for answers attribute in the parent controller
        scope.$parent.$parent.$parent.$watch('answers', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.answers = value;
          /*if (scope.itemType == 'E') {
            scope.answers = [];
            scope.answers[0] = value[0]
          } else {
            scope.answers = value;
          }*/
        });
        scope.$parent.$parent.$parent.$watch('attempts', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.attempts = value;
        });
        //listen for selected choice attribute in the parent controller
        scope.$parent.$parent.$parent.$watch('selectedChoiceId', function (value) {
          if (typeof value === 'undefined') {
            return;
          }

        });
        scope.ansColor = function (ans) {
          // alert("asnwer colore called");
          if (scope.ansSubmitted) {
            if (ans.correct) {
              return 'answer green';
            }
            if (!ans.correct && ans.choiceID === scope.selectedChoiceId) {
              return 'answer red';
            }
          }
          if (scope.ansSelected === ans.choiceID) {
            return 'answer';
          } else {
            return 'answer btn-default';
          }
        };



        scope.$watch('showResult', function (value) {
          if (value === 'true') {
            scope.containerClass = 'questionStepLeft';
          } else {
            scope.containerClass = 'questionFullWidthPanel';
          }
        });
        scope.ansCircle = function (ans) {
          // alert("answer circle called");
          if (scope.ansSubmitted) {
            if (ans.correct) {
              return 'answer-circle green';
            } else if (!ans.correct && ans.choiceID === scope.selectedChoiceId) {
              return 'answer-circle red';
            }
          }
          return 'answer-circle';
        };
        //moved to answer option

        //scope.ansSelected = [];
        //
        //scope.toggleSelect = function (cid) {
        //  if (scope.ansSubmitted) {
        //    return;
        //  }
        //  scope.ansSelected = cid;
        //};


        //scope.toggleSelect = function (idx) {
        //  var pos = scope.ansSelected.indexOf(idx);
        //  if (pos == -1) {
        //    scope.ansSelected.push(idx);
        //    console.log("ansSelected", idx)
        //  } else {
        //    scope.ansSelected.splice(pos, 1);
        //  }
        //};




        var data;
       //console.log(scope.ansSelected)
        /** For Study Item of type questions, the total study item is calculated based on when the user submits the answer**/
        scope.submit = function () {
          //increase attempts when attempt question
          console.log(angular.element(document).find('.activeQuestion > div > p:nth-child(2) input').length);
          if (angular.element(document).find('.activeQuestion > div > p:nth-child(2) input').length > 0) {
            var inputValue = (angular.element(document).find('.activeQuestion > div > p:nth-child(2) input').val());
            console.log(scope.$parent.$parent.selectedChoice);
            if (scope.$parent.$parent.selectedChoice.length > 0 ) {
              $timeout(function() {
                scope.$parent.$parent.selectedChoice[0].text = "<p>"+ inputValue + "</p>";
              });
            }
          }
          //console.log(scope.find('input'));
          console.log("submit");
          scope.$parent.$parent.$parent.attempts = parseInt(scope.attempts) + 1;
          var totalStudyItemStudyTime = scope.$parent.time;
          //                    scope.$parent.explanationbox.show = false;
          //                    scope.$parent.copyExplanationBox.show = false;
          scope.$parent.showResult = true;
          scope.ansSubmitted = true;

          //scope.selectedChoiceId = cid; //this should be set when a particular answer choice is selected
          //alert(scope.selectedChoiceId);
          //scope.selectedChoiceId =  scope.$parent.$parent.$parent.selectedChoiceId;

          data = { selected: true };

          //console.log(scope.$parent.$parent.selectedChoice)
          /* Update the user selection*/
          //choices.updateUserChoice(scope.$parent.$parent.$parent.uid, scope.$parent.$parent.selectedChoiceId, data);

          angular.forEach(scope.$parent.$parent.selectedChoice, function (object, index) {
            choices.updateUserChoice(scope.$parent.$parent.$parent.uid, object.id, data);

          });
          var currentTime = new Date().getTime();
          data = {
            lastStudied: currentTime,
            totaltime: totalStudyItemStudyTime
          };
          USI.updateStudyItem(scope.$parent.$parent.$parent.uid, scope.$parent.$parent.$parent.gid, scope.$parent.$parent.$parent.id, data);
        };
      }
    };
  }
]);
