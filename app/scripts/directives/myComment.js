'use strict';
angular.module('crackooApp').directive('myComment', [
  'CommentService',
  'UserService',
  function (Comments) {
    return {
      templateUrl: 'views/comments/myComment.html',
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
        attrs.$observe('myComment', function () {
          if ($scope.uid === $scope.userid) {
            $scope.referenceActionsShow = true;
          } else {
            $scope.referenceActionsShow = false;
          }
        });
        ///* Get the profile image*/
        //var imgUrl = $scope.imgUrl = User.getProfilePicture($scope.$parent.$parent.$parent.fbid);
        //imgUrl.then(function(res){
        //    $scope.imgUrl = res;
        //});
        /* Like a Comment*/
        $scope.like = function (sid, id) {
          Comments.likeComment(sid, id);
          $scope.likes += 1;
        };
        /* Dislike a comment*/
        $scope.dislike = function (sid, id) {
          console.log('Comment disliked');
          Comments.dislikeComment(sid, id);
          $scope.dislikes += 1;
        };
        /* Edit my comment*/
        $scope.edit = function () {
          if ($scope.uid === $scope.userid) {
            $scope.isEditVisible = true;
            $scope.tempDescription = $scope.description;
          }
        };
        /* Save changes to my comment*/
        $scope.save = function () {
          if ($scope.tempDescription !== '') {
            $scope.isEditVisible = false;
            $scope.description = $scope.tempDescription;
            Comments.updateStudyItemComment($scope.userid, $scope.id, $scope.description);
          }
        };
        /*Cancel changes to my comment*/
        $scope.cancel = function () {
          $scope.isEditVisible = false;
          $scope.tempDescription = null;
        };
        /*Delete my comment*/
        $scope.delete = function (id) {
          if ($scope.uid === $scope.userid) {
            $scope.del({ 'id': id });
          }
        };
        /* Choose color for likes/dislikes*/
        $scope.color = function (likes, dislikes) {
          return likes - dislikes > 0 ? 'green' : 'red';
        };
        /* Display the net number of likes*/
        $scope.displayLikes = function (likes, dislikes) {
          return likes - dislikes;
        };
      }
    };
  }
]);
