'use strict';
angular.module('crackooApp').controller('loginCtrl', [
  '$scope',
  '$rootScope',
  'GoalService',
  'StudyItemService',
  '$location',
  '$document',
  '$routeParams',
  'app.config','$window','$auth','UserService', 'authService',
  function ($scope, $rootScope, goalService, items, $location, $document, $routeParams, config,$window, $auth, UserService, AuthService) {

    $scope.chosenTitle = 'Login to Crackoo';
    //PageTitleService.setCurrentTitle("Login to Crackoo for improved learning outcome");
    //$rootScope.windowTitle = "abc";

    //$rootScope.title = "loginTitle";
    //$window.document.title = "loing title"0



    if ($routeParams.path) {
        var url = decodeURIComponent($routeParams.path);
        $rootScope.redirectURL = url;
    }
    $scope.loginGoogle = function (response) {
      //gapi.auth.init();
      //gapi.signin.render('mySignIn', {
      //  'callback': 'signinCallback',
      //  'clientid': '957635322343-jmmkn962pq9vsuu8j0chvhpjasvop1pu.apps.googleusercontent.com',
      //  'cookiepolicy': 'single_host_origin',
      //  'requestvisibleactions': 'http://schemas.google.com/AddActivity',
      //  'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
      //  'response_type': 'code'
      //});
      gapi.auth.authorize({ client_id: '957635322343-jmmkn962pq9vsuu8j0chvhpjasvop1pu.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
        immediate: false}, $window.signinCallback );
    };
    $scope.loginFb = function () {
      FB.login(function () {
      }, { scope: 'email,public_profile' });
      //$rootScope.$broadcast('fb_authLogin', "");
    };

    $scope.loginCrackoo = function () {
      $auth.login({ email: $scope.email, password: $scope.password })
          .then(function() {
            UserService.getUserData().then(function(response){
            AuthService.loginCrackoo(response.data);
            $location.path('/courses');
            });
          })
          .catch(function(response) {
            $scope.loginError = true;
            $scope.errorMsg = response.data;
            //$location.path('/login');
          });
    };

    $scope.registerCrackoo = function () {
      $auth.signup({
        displayName: $scope.displayName,
        email: $scope.email,
        password: $scope.password
      })
        .then(function() {
          UserService.getUserData().then(function(response){
            AuthService.loginCrackoo(response.data);
            $location.path('/courses');
          });
        })
        .catch(function(response) {
          $scope.registerError = true;
          $scope.errorMsg = response.data;
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          UserService.getUserData().then(function(response){
            AuthService.loginCrackoo(response.data);
            $location.path('/courses');
          });
          
        })
        .catch(function(response) {
          $location.path('/login');
        });
    };

    $scope.gotoAnchor = function (x) {
      $location.path('/');
      //home.then(function (res) {
      var section = angular.element(document.getElementById(x));
      $document.scrollToElementAnimated(section);
      //});
    };
  }
]);
