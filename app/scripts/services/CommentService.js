'use strict';
angular.module('crackooApp').factory('CommentService', [
  '$rootScope',
  '$ajax',
  '$http',
  'ENV',
  function ($rootScope, $ajax, $http, config) {
    return {
      base_url: config.basepath,
      /* Creates Study Item Comment */
      createComment: function (uid, studyItemId, comment) {
        var _self = this;
        var promise = $http({
          method: 'POST',
          url: _self.base_url + '/usercomments/users/' + uid + '/studyitems/' + studyItemId + '/comments',
          data: comment  //,
                   //'headers' : {'Content-Type': 'application/json'}
        });
        return promise;
      },
      /* Creates a comment for Goal */
      createGoalComment: function (goalId, comment) {
        var _self = this;
        var promise = $ajax({
          method: 'POST',
          url: _self.base_url + '/goals/' + goalId + '/comments',
          data: comment
        });
        return promise;
      },
      /* Updates Study Item Comment */
      updateStudyItemComment: function (uid, commentId, comment) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/usercomments/users/' + uid + '/comments/' + commentId,
          data: comment
        });
        return promise;
      },
      /* Delete Study Item Comments */
      deleteComment: function (uid, commentId) {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/usercomments/users/' + uid + '/comments/' + commentId
        });
        return promise;
      },
      getComments: function (sid) {
        var _self = this;
        var promise = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + sid + '/comments'
        });
        return promise;
      },
      /* Gets all the User Comments */
      getUserComments: function (userId, studyItemId) {
        var _self = this;
        var userComments = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + userId + '/studyitems/' + studyItemId + '/comments'
        });
        return userComments;
      },
      /* Gets all comments for a Goal */
      getGoalComments: function (goalId) {
        var _self = this;
        var goalComments = $ajax({
          method: 'GET',
          url: _self.base_url + '/goals/' + goalId + '/comments'
        });
        return goalComments;
      },
      /* Gets User comment for the given Comment Id */
      getUserComment: function (uid, commentId) {
        var _self = this;
        var userComment = $ajax({
          method: 'GET',
          url: _self.base_url + '/usercomments/users/' + uid + '/comments/' + commentId
        });
        return userComment;
      },
      /* Likes a Comment */
      likeComment: function (userId, commentId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/users/' + userId + '/comments/' + commentId + '/like'
        });
        return promise;
      },
      /* Dislikes a Comment */
      dislikeComment: function (userId, commentId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/users/' + userId + '/comments/' + commentId + '/dislike'
        });
        return promise;
      },
      /* Deletes all Comments */
      deleteAllComments: function () {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/comments'
        });
        return promise;
      }
    };
  }
]);
