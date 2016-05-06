'use strict';
angular.module('crackooApp').controller('DashboardCtrl', [
  '$scope',
  'UserService',
  'auth',
  function ($scope, User,auth) {
   console.log("auth is " + auth.session);
    var id = auth.session.userid;
    //User.info.id = id;
    $scope.title = 'Dashboard';
    $scope.dashboard = User.getDashboard();
    $scope.friends = User.getFriendsActivity();
    $scope.goals = User.getGoals();
    $scope.questions = User.getQuestions();
  }
]);
