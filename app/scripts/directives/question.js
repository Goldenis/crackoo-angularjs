'use strict';
angular.module('crackooApp').directive('question', [
  'QuestionService',
  'UserService',
  function (Questions) {
    return {
      templateUrl: 'views/questions/question.html',
      restrict: 'A',
      replace: false,
      scope: {
        userid: '@',
        id: '@',
        description: '@',
        likes: '@',
        dislikes: '@',
        creationTime: '@',
        sid: '@',
        imgUrl: '@',
        autherName: '@'
      },
      link: function (scope) {
        //console.log(scope.com);
        scope.like = function (sid, id) {
          Questions.likeQuestion(sid, id);
          scope.likes += 1;  /*	$scope.likes.then(function(response){
					response = response + 1;
				});*/
        };
        //var imgUrl = scope.imgUrl = UserService.getProfilePicture(scope.userid);
        //imgUrl.then(function(res){
        //    scope.imgUrl = res;
        //});
        scope.dislike = function (sid, id) {
          Questions.dislikeQuestion(sid, id);
          scope.dislikes += 1;
        };
        scope.color = function (likes, dislikes) {
          return likes - dislikes > 0 ? 'green' : 'red';
        };
        scope.displayLikes = function (likes, dislikes) {
          return likes - dislikes;
        };
      }
    };
  }
]);
