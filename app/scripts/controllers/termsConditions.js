'use strict';
angular.module('crackooApp').controller('termsConditionsCtrl', ['$scope', '$rootScope','authService', '$timeout',
  function ($scope, $rootScope, AuthService, $timeout) {

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
        $scope.first_name = data.displayName;
        $scope.imgUrl = data.imgUrl;
      }
    }, true);

  }
]);
