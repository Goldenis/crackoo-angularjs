'use strict';
angular.module('crackooApp').directive('myQuestion', [
  'QuestionService',
  'UserService',
  function (Questions) {
    return {
      templateUrl: 'views/questions/myQuestion.html',
      restrict: 'A',
      replace: false,
      scope: {
        uid: '@',
        id: '@',
        description: '@',
        likes: '@',
        dislikes: '@',
        creationTime: '@',
        sid: '@',
        imgUrl: '@',
        del: '&',
        userid: '@',
        autherName: '@'
      },
      link: function ($scope, element, attrs) {
        //console.log($scope.description);
        $scope.isEditVisible = false;
        $scope.tempDescription = null;
        $scope.isAnswerVisible = false;
        $scope.answers = [];
        attrs.$observe('myQuestion', function () {
          if ($scope.uid === $scope.userid) {
            $scope.referenceActionsShow = true;
          } else {
            $scope.referenceActionsShow = false;
          }
        });
        $scope.like = function (uid, id) {
          Questions.likeQuestion(uid, id);
          $scope.likes += 1;  /*	$scope.likes.then(function(response){
					response = response + 1;
				});*/
        };
        //var imgUrl = $scope.imgUrl = UserService.getProfilePicture($scope.$parent.$parent.$parent.fbid);
        //imgUrl.then(function(res){
        //    $scope.imgUrl = res;
        //});
        $scope.dislike = function (uid, id) {
          Questions.dislikeQuestion(uid, id);
          $scope.dislikes += 1;
        };
        $scope.edit = function () {
          if ($scope.uid === $scope.userid) {
            $scope.isEditVisible = true;
            $scope.tempDescription = $scope.description;
            $scope.isAnswerVisibleBtn = true;
          }
        };
        $scope.save = function () {
          if ($scope.tempDescription !== '') {
            $scope.isEditVisible = false;
            $scope.description = $scope.tempDescription;
            $scope.isAnswerVisibleBtn = false;
            Questions.updateQuestion($scope.userid, $scope.id, $scope.description);
          }
        };
        $scope.cancel = function () {
          $scope.isEditVisible = false;
          $scope.tempDescription = null;
          $scope.isAnswerVisibleBtn = false;
        };
        $scope.delete = function (id) {
          if ($scope.uid === $scope.userid) {
            $scope.del({ 'id': id });
          }
        };
        $scope.color = function (likes, dislikes) {
          return likes - dislikes > 0 ? 'green' : 'red';
        };
        $scope.displayLikes = function (likes, dislikes) {
          return likes - dislikes;
        };
        $scope.loadAnswers = function (id) {
          /*load answer call*/
          var answers = [];
          for (var i = 0; i <= 3; i += 1) {
            var answer = {};
            answer.imgUrl = $scope.imgUrl;
            answer.description = 'This question Answer ' + (i + 1);
            answer.user = {
              'firstname': 'John',
              'lastname': 'Doe'
            };
            answer.id = id;
            answers.push(answer);
          }
          $scope.answers = answers;
        };
        $scope.loadAnswers($scope.id);
        $scope.newAnswer = function () {
          $scope.isAnswerVisible = true;
          $scope.tempAnswer = '';
        };
        $scope.cancelAnswer = function () {
          $scope.isAnswerVisible = false;
          $scope.tempAnswer = null;
        };
        $scope.saveAnswer = function () {
          if ($scope.tempAnswer !== '') {
            $scope.isAnswerVisible = false;
            var answer = {};
            answer.imgUrl = $scope.imgUrl;
            answer.description = $scope.tempAnswer;
            answer.user = {
              'firstname': 'John',
              'lastname': 'Doe'
            };
            answer.id = $scope.tempAnswer.length;
            $scope.answers.push(answer);
          }
        };
        $('.toogle-link').unbind('click');
        $('.toogle-link').bind('click', function () {
          $(this).next('.toogle-content').slideToggle();
          $(this).toggleClass('closed-content');
          $(this).prev('h3').toggleClass('green-title');
        });
      }
    };
  }
]);
