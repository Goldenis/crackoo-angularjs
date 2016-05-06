'use strict';
angular.module('crackooApp').directive('mynote', [
  'NoteService',
  'UserService',
  function (NotesService) {
    return {
      templateUrl: 'views/notes/myNotes.html',
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
        attrs.$observe('mynote', function () {
          if ($scope.uid === $scope.userid) {
            $scope.referenceActionsShow = true;
          } else {
            $scope.referenceActionsShow = false;
          }
        });
        $scope.like = function (sid, id) {
          NotesService.likeNotes(sid, id);
          $scope.likes += 1;  /*	$scope.likes.then(function(response){
					response = response + 1;
				});*/
        };
        //var imgUrl = $scope.imgUrl = UserService.getProfilePicture($scope.$parent.$parent.$parent.fbid);
        //imgUrl.then(function(res){
        //    $scope.imgUrl = res;
        //});
        $scope.dislike = function (sid, id) {
          NotesService.dislikeNotes(sid, id);
          $scope.dislikes += 1;
        };
        $scope.edit = function () {
          if ($scope.uid === $scope.userid) {
            $scope.isEditVisible = true;
            $scope.tempDescription = $scope.description;
          }
        };
        $scope.save = function () {
          if ($scope.tempDescription !== '') {
            $scope.isEditVisible = false;
            $scope.description = $scope.tempDescription;
            NotesService.updateNote($scope.userid, $scope.id, $scope.description);
          }
        };
        $scope.cancel = function () {
          $scope.isEditVisible = false;
          $scope.tempDescription = null;
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
      }
    };
  }
]);
