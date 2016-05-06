'use strict';
angular.module('crackooApp').controller('GoalsCtrl', [
  '$scope',
  '$rootScope',
  'GoalService',
  'UserGoalService',
  'app.config',
  'StudyItemService',
  '$location',
  'auth','$routeParams',
  function ($scope, $rootScope, goalService, userGoalService, config, items, $location, auth, $routeParams) {
    $scope.chosenTitle = 'GRE course, GRE Wordlist, SAT Wordlist,GRE Practice Questions,SAT Practice Questions, Online Courses, Test Prep Courses, Practice Questions and eLearning Courses';


    $scope.title = 'Goals';
    //$scope.categories = ["Study Activity","Focus","Progress","Confidence Level","Difficulty Level","Time Level","Review Report"];
    var categories = goalService.getGoalTags();
    categories.then(function (res) {
      $scope.categories = res;
      console.log('categories =', $scope.categories);
    });
    $scope.showHeader = 'true';

    $scope.activeTab = 'allCourses';
    $scope.selectedCategory = '';
    $rootScope.isGoalPage = true;
    //console.log($rootScope.isGoalPage);
    var userid = auth.getUser().email;
    $scope.homepage = false;

    var category = $routeParams.category;
    if(category != undefined ){
      var goals = goalService.getTagGoals(category);
      goals.then(function (res) {
        $scope.courses = res;  //console.log(res);
      });
      $scope.hideCategoris = true;
    }else{
      var goals = goalService.getAllGoals();
      goals.then(function (res) {
        $scope.courses = res;
        console.log('All goals are :', JSON.stringify(res));
      });
    }

    var mycourses = userGoalService.getAllGoals(userid);
    mycourses.then(function (res) {
      $scope.mycourses = res;
      //console.log('mygoals are :', res);
    });
    $scope.config = config;
    $scope.id = userid;
    $scope.switchTab = function (tab) {
      if (tab === 'allCourses') {
        $scope.activeTab = tab;
        var goals = goalService.getAllGoals();
        goals.then(function (res) {
          $scope.courses = res;
          console.log(res);
        });
      } else if (tab === 'myCourses') {
        $scope.activeTab = tab;
        var mycourses = userGoalService.getAllGoals(userid);
        mycourses.then(function (res) {
          $scope.mycourses = res;  //console.log(res);
          $scope.courses = res;  //console.log(res);
        });
      }
    };
    $scope.selectCategory = function (category) {
      $scope.selectedCategory = category;
      var goals = goalService.getTagGoals(category.name);
      goals.then(function (res) {
        $scope.courses = res;  //console.log(res);
      });
    };

	 var gid = $scope.gid = $routeParams.gid;
	 var tid = $scope.tid = $routeParams.tid;

	 if(gid != undefined && tid != undefined){
		 var goals = goalService.getStudyItemsForTopic(tid, gid);
		 goals.then(function (res) {
			 $scope.courses = res;
		 });
	 }

  }
]);
