'use strict';
angular.module('crackooApp').controller('HomeCtrl', [
  '$anchorScroll',
  '$location',
  '$scope',
  '$document',
  'ContactService','$timeout','$rootScope','$window',
  function ($anchorScroll, $location, $scope, $document, contactService, $timeout,$rootScope,$window) {

    $scope.chosenTitle =  'Analytics powered smart learning platform ';
    $scope.description= 'Crackoo is a cloud based learning platform to address the unique learning goals of every learner and to make learning more efficient and effective';
    $scope.keywords = 'Free test preparation, free testing for learners, Flashcards, crack exam, Test Prep, Standardized Tests,Test Preparation, Test Prep Courses, GRE,track study progress, track test preparation, personalized learning platform, study notes,learning platform for students, learning platform for publishers,social learning platform continuous assessment, monetize educational content';
    // This flag we use to show or hide the button in our HTML.
    $scope.signedIn = false;
    $scope.blankContact = {
      "name":"",
      "phone":"",
      "email":"",
      "message":"",
      "location":""};
    $scope.contact = angular.copy($scope.blankContact);
    // Here we do the authentication processing and error handling.
    // Note that authResult is a JSON object.
    $scope.processAuth = function (authResult) {
      // Do a check if authentication has been successful.
      if (authResult.access_token) {
        // Successful sign in.
        $scope.signedIn = true;  //     ...
                                 // Do some work [1].
                                 //     ...
      } else if (authResult.error) {
        // Error while signing in.
        $scope.signedIn = false;  // Report error.
      }
    };

    $scope.signUpNow = function (response) {
      $scope.chosenTitle = 'Dynamic Title';
      $location.path('/signup');
    };

    $scope.showCourses = function (response) {
      //$scope.chosenTitle = 'Dynamic Title';
      $location.path('/courses');
    };

    $scope.fbLogin = function (response) {
      FB.login(function () {
      }, { scope: 'email,public_profile' });
      //$rootScope.$apply(function () {
        $rootScope.$broadcast('fb_authLogin', response);

      //});
    };

    $scope.googleRender = function (response) {
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


    // When callback is received, we need to process authentication.
    //$scope.signInCallback = function (authResult) {
    //  $scope.$apply(function () {
    //    $scope.processAuth(authResult);
    //  });
    //};
    // Render the sign in button.
    //        $scope.renderSignInButton = function() {
    //            gapi.signin.render('signInButton',
    //                {
    //                    'callback': $scope.signInCallback, // Function handling the callback.
    //                    'clientid': '957635322343-jmmkn962pq9vsuu8j0chvhpjasvop1pu.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
    //                    'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
    //                    // as their explanation is available in Google+ API Documentation.
    //                    'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
    //                    'cookiepolicy': 'single_host_origin'
    //                }
    //            );
    //        }
    //Start function in this example only renders the sign in button.
    $scope.start = function () {
    };
    // Call start function on load.
    $scope.start();
    $scope.gotoAnchor = function (x) {
      var section = angular.element(document.getElementById(x));
      $document.scrollToElementAnimated(section);
    };

    $scope.createContact = function(){
      var contacts = contactService.createContact($scope.contact);
      //contacts.then(function(res){
      //  $scope.contact = angular.copy($scope.blankContact);
      //});

      $timeout(function() {
        contacts.then(function(name) {
          $scope.contact = angular.copy($scope.blankContact);
        });
      }, 200);


    }

  }
]);
