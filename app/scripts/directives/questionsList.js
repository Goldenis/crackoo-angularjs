'use strict';
angular.module('crackooApp').directive('questionsList', [
  'QuestionService',
  'UserService',
  'authService',
  function (QuestionService, User, AuthService) {
    return {
      templateUrl: 'views/questions/questionsList.html',
      restrict: 'A',
      scope: {
        questions: '=',
        myQuestions: '=',
        sid: '@',
        gid: '@gid',
        uid: '@uid',
        id: '@id'  //isShowMyQuestions : '@',
               //isShowQuestions : '@'
      },
      link: function postLink(scope) {
        scope.questionData = null;
        scope.qId = 1;
        scope.questionList = scope.questions;
        console.log(scope.questionList);
        scope.showMyQuestion = false;
        scope.toggleMyQuestions = function () {
          scope.showMyQuestion = !scope.showMyQuestion;
          if (scope.showMyQuestion) {
            scope.questionList = scope.myQuestions;
          } else {
            scope.questionList = scope.questions;
          }
        };
        //watch for changes in the value of my questions
        scope.$parent.$watch('myQuestions', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.myQuestions = value;
          if (scope.showMyQuestion) {
            scope.questionList = scope.myQuestions;
          }  //              if ((scope.myQuestions.length > 0)){
             //                  scope.isShowMyQuestions = true ;
             //              }
             //alert(scope.isShowMyComments);
        });
        //watch for changes in the value of questions
        scope.$parent.$watch('questions', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.questions = value;
          if (!scope.showMyQuestion) {
            scope.questionList = scope.questions;
          }  //              if ((scope.questions.length > 0)){
             //                  //alert("lenght is greater than zero");
             //                  scope.isShowQuestions = true ;
             //              }
             //alert(scope.isShowComments);
        });
        //          scope.showMyQuestions = function() {
        //              return scope.myQuestions.length > 0;
        //          };
        //
        //          scope.showQuestions = function() {
        //              //alert(scope.isShowQuestions);
        //              return scope.questions.length > 0;
        //          };
        scope.addQuestion = function (uid, sid) {
          var data = scope.questionData;
          scope.questionData = null;
          //Create the question and get the questionID
          var createdQuestion = QuestionService.createQuestion(uid, sid, data);
          var questionID = null;
          createdQuestion.then(function (resp) {
            //console.log('resp.headers()', resp.headers());
            var location = resp.headers('Location');
            questionID = location.substring(location.lastIndexOf('questions') + 10);
            //var profileImage = User.getProfilePicture();
            //profileImage.then(function(resp_img){
            var newQuestion = {
              userid: uid,
              description: data,
              imgUrl: AuthService.session.imgUrl,
              username: AuthService.session.displayName,
              questionID: questionID,
              creationDate: Date.now()
            };
            scope.qId += 1;
            console.log('new question is ', newQuestion);
            scope.myQuestions.unshift(newQuestion);
            scope.questions.unshift(newQuestion);  //push to server
          });  //});
        };
        scope.delete = function (id) {
          QuestionService.deleteUserQuestion(scope.uid, id);
          for (var i = 0; i < scope.myQuestions.length; i += 1) {
            if (scope.myQuestions[i].questionID === id) {
              scope.myQuestions.splice(i, 1);
            }
          }
          for (var j = 0; j < scope.questions.length; j += 1) {
            if (scope.questions[j].questionID === id) {
              scope.questions.splice(j, 1);
            }
          }
        };
      }
    };
  }
]);
