'use strict';
angular.module('crackooApp').directive('comment', [
  'CommentService',
  'UserService',
  function (Comments, User) {
    return {
      templateUrl: 'views/comments/comment.html',
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
        imgUrl: '@'
      },
      link: function (scope) {
        //console.log(scope.com);
        scope.like = function (sid, id) {
          Comments.likeComment(sid, id);
          scope.likes += 1;  /*	$scope.likes.then(function(response){
					response = response + 1;
				});*/
        };
        var imgUrl = scope.imgUrl = User.getProfilePicture(scope.userid);
        imgUrl.then(function (res) {
          scope.imgUrl = res;
        });
        scope.dislike = function (sid, id) {
          Comments.dislikeComment(sid, id);
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
