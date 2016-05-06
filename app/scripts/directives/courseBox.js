'use strict';
angular.module('crackooApp').directive('courseBox', [
  '$location',
  'StudyItemService',
  'UserGoalService',
  '$rootScope',
  'GoalDataService',
  'authService',
  function ($location, items, usergoal, $rootScope, GoalDataService, Auth) {
    return {
      templateUrl: 'views/courseIntroBox.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.showMoreHide = attrs.showMoreHide;
        scope.isEditable = false;
        scope.loggedInUser = "";
        scope.edit = {};

        scope.$watch(function(){
            return Auth.session;
        }, function(data){
          if(data !== null){
            if (data.status === 'connected') {
              scope.isConnent = true;
              scope.loggedInUser = data.email;
            } else {
              scope.isConnent = false;
            }
          }
        }, true);
        //if (Auth.session.status === 'connected') {
        //  scope.isConnent = true;
        //  scope.loggedInUser = Auth.session.email;
        //} else {
        //  scope.isConnent = false;
        //}
        scope.studyNow = function (course) {
          //          $rootScope.headerTitle = course.name;
          //usergoal.createGoal(id, course.goalID);
          //$rootScope.cgid = gid;
          //$rootScope.cgname = gname;
          //			console.log("auth =",Auth.session);
          GoalDataService.setCurrentGoal(course);
          var its = items.getStudyItems(course.name);
          its.then(function (response) {
            GoalDataService.setStudyItems(response);
            $location.path('goals/' + (course.name).replace(/\s+/g, '-') + '/items/' + response[0].studyItemID);
          });  /*GoalDataService.setCurrentGoal(course);
          var its = items.getStudyItems(course.goalID);
          its.then(function(response) {
              GoalDataService.setStudyItems(response);
              $location.path('goals/'+course.goalID+'/items/'+response[0].studyItemID);
          });*/
        };
        //display the number of users for a particular goal
        scope.displayUsers = function (n) {
          if (n < 10) {
            return '< 100';
          } else {
            return n;
          }
        };

        scope.editDescription = function(){
          scope.isEditable = true;
          scope.edit.course = angular.copy(scope.course);
        };

        scope.cancelEditing = function(){
          scope.isEditable = false;
        };

        scope.saveEditing = function(){
          /*Save Logic for edit*/
          scope.course = angular.copy(scope.edit.course);
          scope.isEditable = false;
        };
      }
    };
  }
]);
