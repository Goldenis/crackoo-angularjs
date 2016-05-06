'use strict';
angular.module('crackooApp').directive('myQuestionAnswer', [
  '$location',
  'UserService',
  function () {
    return {
      templateUrl: 'views/questions/myQuestionAnswer.html',
      restrict: 'A',
      scope: {
        imgUrl: '@',
        description: '@',
        user: '=',
        id: '@'
      },
      link: function postLink() {
        //var imgUrl = null;  //var imgUrl = $scope.imgUrl = UserService.getProfilePicture($scope.$parent.$parent.$parent.$parent.fbid);
                            //imgUrl.then(function(res){
                            //    $scope.imgUrl = res;
                            //});
      }
    };
  }
]);
