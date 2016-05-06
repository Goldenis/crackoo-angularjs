'use strict';
angular.module('crackooApp').directive('commentList', [
  'CommentService',
  'UserService',
  'authService',
  function (Comments, User, AuthService) {
    return {
      templateUrl: 'views/comments/commentList.html',
      restrict: 'A',
      scope: {
        comments: '=',
        myComments: '=',
        sid: '@',
        gid: '@gid',
        uid: '@uid',
        id: '@id'  //        isShowMyComments : '@',
               //        isShowComments : '@'
      },
      link: function postLink(scope) {
        scope.commentData = null;
        scope.cId = 1;
        console.log(scope.comments);
        scope.commentsList = scope.comments;
        console.log(scope.commentsList);
        scope.showMyComment = false;
        scope.toggleMyComments = function () {
          scope.showMyComment = !scope.showMyComment;
          if (scope.showMyComment) {
            scope.commentsList = scope.myComments;
          } else {
            scope.commentsList = scope.comments;
          }
        };
        //watch for changes in the value of my comments
        scope.$parent.$watch('myComments', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.myComments = value;
          if (scope.showMyComment) {
            scope.commentsList = scope.myComments;
          }  //   		if ((scope.myComments.length > 0)){
             //   			scope.myComments = value;
             //            scope.isShowMyComments = true ;
             //   		}
             //alert(scope.isShowMyComments);
        });
        //watch for changes in the value of comments
        scope.$parent.$watch('comments', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.comments = value;
          if (!scope.showMyComment) {
            scope.commentsList = scope.comments;
          }  //   		if ((scope.comments.length > 0)){
             //   			scope.comments = value;
             //            scope.isShowComments = true ;
             //   		}
             //alert(scope.isShowComments);
        });
        //	   scope.showMyComments = function() {
        //	   	//alert(scope.isShowMyComments);
        //	   	return scope.myComments.length > 0;
        //	   };
        //
        //        scope.showComments = function() {
        //	   	//alert(scope.isShowComments);
        //	   	return scope.comments.length > 0;
        //	   };
        scope.addComment = function (uid, sid) {
          var data = scope.commentData;
          scope.commentData = null;
          var createdComment = Comments.createComment(uid, sid, data);
          var commentID = null;
          createdComment.then(function (resp) {
            var location = resp.headers('location');
            commentID = location.substring(location.lastIndexOf('comments') + 9);
            var newComment = {
              userid: uid,
              description: data,
              imgUrl: AuthService.session.imgUrl,
              username: AuthService.session.displayName,
              commentID: commentID,
              creationDate: Date.now()
            };
            scope.cId += 1;
            console.log(newComment);
            scope.myComments.unshift(newComment);
            scope.comments.unshift(newComment);
          });
        };
        scope.delete = function (id) {
          //alert(id);
          Comments.deleteComment(scope.uid, id);
          for (var i = 0; i < scope.myComments.length; i += 1) {
            if (scope.myComments[i].commentID === id) {
              scope.myComments.splice(i, 1);
            }
          }
          for (var j = 0; j < scope.comments.length; j += 1) {
            if (scope.comments[j].commentID === id) {
              scope.comments.splice(j, 1);
            }
          }
        };
      }
    };
  }
]);
