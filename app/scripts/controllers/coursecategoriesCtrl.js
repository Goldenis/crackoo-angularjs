'use strict';
angular.module('crackooApp').controller('coursecategoriesCtrl', ['$scope', '$rootScope','authService', '$timeout',
  function ($scope, $rootScope, AuthService, $timeout) {
    $scope.title = 'Crackoo: Online Test Prep courses';
    $scope.SEOKeywords = 'GRE, Standardized Tests,Test Preparation, Test Prep Courses, GRE, LSAT, MCAT, GMAT, ACT, SAT, AP, TOEFEL';
    $scope.SEODescription = 'Focused and Goal oriented online test prep courses available at Crackoo. Courses include GRE, GMAT, ACT, LSAT, MCAT, SAT, TOEFEL';

    $timeout(function(){
      $("#topBar").removeClass("homeBar");
      $('html, body').animate({
        scrollTop: 0
      }, 50);
    }, 500);

    /** Set the user first name on the green bar**/
    $scope.$watch(function () {
      return AuthService.session;
    }, function (data) {
      if (data !== null) {
        
        console.log("first_name"+data.displayName);
        console.log("image_url"+data.imgUrl);
        
        $scope.first_name = data.displayName;
        $scope.imgUrl = data.imgUrl;
      }
    }, true);

  }
]);
