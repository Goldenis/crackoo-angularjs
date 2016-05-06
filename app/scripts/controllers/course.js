'use strict';
angular.module('crackooApp').controller('CourseCtrl', [
  '$scope',
  '$rootScope',
  'GoalService',
  'StudyItemService',
  '$location',
  '$document','$routeParams',
  function ($scope, $rootScope, goalService, items, $location, $document,$routeParams) {
    $scope.chosenTitle = 'Online Test Prep Courses, Multiple Choice Questions, Flashcards - Crackoo';
    $scope.SEOKeywords = 'Crack GRE wordlist, GRE flashcards, GRE word list, GRE word list, gre practice, GRE Free verbal practice, free test preparation, free testing for learners, GRE flashcards, crack GRE, Test Prep, track GRE progress, Standardized Tests,Test Preparation, Test Prep Courses, GRE, LSAT, MCAT, GMAT, ACT, SAT, AP, Prep Courses, track study progress, track test preparation';
    $scope.SEODescription = 'Focused and Goal oriented online courses available at Crackoo. Courses include GRE, SAT';

    $scope.title = 'Goals';
    $scope.activeTab = 'allCourses';
    $scope.showHeader = 'false';
    $rootScope.isGoalPage = true;
    console.log($rootScope.isGoalPage);

    $scope.homepage = false;

    var category = $routeParams.category;
    if(category != undefined ){
      var goals = goalService.getTagGoals(category);
      goals.then(function (res) {
        $scope.courses = res;
        console.log(res);
      });
      $scope.hideCategoris = true;
    }else{
      var goals = goalService.getAllGoals();
      goals.then(function (res) {
        $scope.courses = res;
        console.log('All goals are :', JSON.stringify(res));
      });
    }
    $scope.gotoAnchor = function (x) {
      $location.path('/');
      //home.then(function (res) {
      var section = angular.element(document.getElementById(x));
      $document.scrollToElementAnimated(section);
      //});
    };
  }
]);
