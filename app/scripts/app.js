'use strict';

//For Production mode use:
// AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
//For test mode use:
//AngularyticsProvider.setEventHandlers(['Console', 'Google']);

angular.module('crackooApp', ['ngRoute','angular-loading-bar','ngAnimate', 'duScroll', 'angularMoment', 'angularytics', 'apiconfig', 'appconfig', 'LocalStorageModule', 'satellizer','ng','viewhead', 'ui.slider'])
  .config(['$routeProvider', '$locationProvider','$httpProvider', 'AngularyticsProvider', 'localStorageServiceProvider','$authProvider','APP_ID', function ($routeProvider,$locationProvider, $httpProvider, AngularyticsProvider, localStorageServiceProvider, $authProvider, APP_ID) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    localStorageServiceProvider
      .setPrefix('crackoo');
    //$httpProvider.interceptors.push('httpRequestInterceptor');
    //$httpProvider.interceptors.push('htmlReadyInterceptor');
    //$pageTitleProvider.setDefaultTitle();

    AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/goals', {
        templateUrl: 'views/goals.html',
        controller: 'GoalsCtrl',
        className: 'sub',
        resolve: {auth: 'authentication'},
        secure: true
      })
      .when('/:category/courses', {
        templateUrl: 'views/goals.html',
        controller: 'CourseCtrl',
        className: 'sub'
        //resolve: {auth: 'authentication'},
        //secure: true
      })
      .when('/goals/:gid/topic/:tid', {
        templateUrl: 'views/goals.html',
        controller: 'GoalsCtrl',
        className: 'sub',
        resolve: {auth: 'authentication'},
        secure: true
      })
      //.when('/courses', {
      //  templateUrl: 'views/course.html',
      //  controller: 'CourseCtrl',
      //  className: 'sub'
      //})
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        className: 'sub'
      })
      .when('/goals/:gid/items/:id', {
        templateUrl: 'views/studyItem.html',
        controller: 'StudyitemCtrl',
        className: 'question',
        resolve: {auth: 'authentication'},
        secure: true //comment it for non public study item
      })
      .when('/goals/:gid/items/:id/fullscreen', {
        templateUrl: 'views/studyItemFS.html',
        controller: 'StudyitemfsCtrl',
        className: 'fullscreen',
        resolve: {auth: 'authentication'},
        secure: true
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        className: 'sub',
        resolve: {auth: 'authentication'},
        secure: true
      })
      .when('/goals/:id/details', {
        templateUrl: 'views/goalDetails.html',
        controller: 'GoaldetailsCtrl',
        className: 'sub'
        //resolve: {auth: 'authentication'},
        //secure: true
      })
      .when('/report/:id/:type', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl',
        className: 'report',
        resolve: {auth: 'authentication'},
        secure: true
      })
      .when('/goals/:gid/tableContents/:id', {
        templateUrl: 'views/tableContents.html',
        controller: 'tableContentCtrl',
        className: 'question',
        resolve: {auth: 'authentication'},
        secure: true
      })
      .when('/signup', {
        templateUrl: 'views/register.html',
        controller: 'loginCtrl',
        className: 'login'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
        className: 'login'
      })
      .when('/login/:path', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
        className: 'login'
      })
      .when('/fb/register', {
        //templateUrl: 'views/login.html',
        //controller: 'fbCtrl'
        //className: 'login'
      })
      .when('/terms-and-conditions', {
        templateUrl: 'views/termsConditions.html',
        controller: 'termsConditionsCtrl',
        className: 'termsConditions'
      })
      .when('/privacy-policy', {
        templateUrl: 'views/privacyPolicy.html',
        controller: 'privacyPolicyCtrl',
        className: 'privacyPolicy'
      })
      .when('/partners', {
        templateUrl: 'views/partners.html',
        controller: 'partnersCtrl',
        className: 'partners'
      })
      .when('/courses', {
        templateUrl: 'views/coursecategories.html',
        controller: 'coursecategoriesCtrl',
        className: 'courses'
      })
      .when('/comingsoon', {
        templateUrl: 'views/comingsoon.html',
        controller: 'comingsoonCtrl',
        className: 'comingsoon'
      })
      /*.when('/tableContents', {
       templateUrl: 'views/tableContents.html',
       controller: 'tableContentCtrl',
       className: 'question',
       resolve: {auth: 'authentication'}
       })*/


      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/404.html'
      });

      $authProvider.facebook({
        clientId: APP_ID.appId
      });

      $authProvider.google({
        clientId: '587901984145-r222gr0gsneerdolsktrpp715gu7f3e1.apps.googleusercontent.com'
      });

  }]).run(['$rootScope', '$window', 'authService', '$q', 'Angularytics', '$location', 'APP_ID', '$routeParams', 'app.config', 'localStorageService', '$route',
    function ($rootScope, $window, Auth, $q, Angularytics, $location, APP_ID, $routeParams, localStorageService, $route) {

      //MathJax.Hub.Config({
      //  skipStartupTypeset: true
      //});
      //MathJax.Hub.Configured();

      var googleLoginDone = $q.defer();
      var gapiLoadDone = $q.defer();
      Angularytics.init();
      Auth.deferred = $q.defer();

      $window.fbAsyncInit = function () {
        FB.init({
          appId: APP_ID.appId,
          channelUrl: '//localhost:9000/channel.html',
          cookie: true,
          xfbml: true,
          status: false
        });
        Auth.watchFacebookLoginChange();
      };
      //add sign-in callback for google-login
      $window.signinCallback = function (authResult) {
        if (authResult && authResult.access_token) {
          $rootScope.$broadcast('event:google-plus-signin-success', authResult);
          googleLoginDone.resolve();
        } else {
          $rootScope.$broadcast('event:google-plus-signin-failure', authResult);
          googleLoginDone.resolve();
        }
      };

      $window.handleClientLoad = function (response) {
        gapiLoadDone.resolve();
      };

      //Asynchronously load the G+ SDK.
      (function () {
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = 'https://apis.google.com/js/client:plusone.js?onload=handleClientLoad';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);
      })();

      // Asynchronously load the Facebook SDK.
      (function (d) {
        var js, id = 'facebook-jssdk',
          ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = '//connect.facebook.net/en_US/all.js';

        ref.parentNode.insertBefore(js, ref);
      }(document));
      console.log('Inside app run');

      $rootScope.$on('$routeChangeStart', function (event, next) {
        if ($location.path() == '/fb/register'){

          if (typeof FB == 'undefined' || FB == null) {
            $window.fbAsyncInit = function () {
              FB.init({
                appId: APP_ID.appId,
                channelUrl: '//localhost:9000/channel.html',
                cookie: true,
                xfbml: true,
                status: false
              });
              Auth.watchFacebookLoginChange();
              FB.login(function () {
              }, { scope: 'email,public_profile' });
              return;
            };
          }else{
            Auth.watchFacebookLoginChange();
            FB.login(function () {
            }, { scope: 'email,public_profile' });
            return;
          }
          return;
        }
        var authType = Auth.getAuthType();
        //var isLogged = Auth.isLogged();
        if (authType == 'FB') {
          if (typeof FB == 'undefined' || FB == null) {
            $window.fbAsyncInit = function () {
              FB.init({
                appId: APP_ID.appId,
                channelUrl: '//localhost:9000/channel.html',
                cookie: true,
                xfbml: true,
                status: false
              });
              Auth.watchFacebookLoginChange();
              Auth.handleFBAuth();
            };
          }else{
            Auth.handleFBAuth();
          }
        }
        else if (authType == 'GPLUS') {
          gapiLoadDone.promise.then(function (response){
            Auth.loginGoogle();
            googleLoginDone.promise.then(function (response) {
              if (typeof next != 'undefined' && next && next.$$route && next.$$route.secure !== undefined && next.$$route.secure === true) {
                if (!(Auth.session.status == 'connected') && !($location.path() == '/')) {
                  $location.path('/login/' + encodeURIComponent($location.path()));
                }
              }
            });

          });
        }
        else {
          if (typeof next != 'undefined' && next && next.$$route && next.$$route.secure !== undefined && next.$$route.secure === true) {
            if (!($location.path() == '/')) {
              $location.path('/login/' + encodeURIComponent($location.path()));
            }
          //}else{
          //  resolve auth for the non secure resolve
          //  Auth.deferred.resolve({});
          }
        }
      });

      //$rootScope.$on("$routeChangeSuccess", function (event, currentRoute, previousRoute) {
      //  document.title = "routechangesuccess title";
      //});

      $rootScope.$on('$routeChangeSuccess', function (event, data,xx) {
        $rootScope.pageTitle = "long title";

        //$document[0].title = "loing title";

      });

      //app.controller('AppCtrl', ['$scope', function ($scope) {
      //  $scope.$on('$routeChangeSuccess', function (event, data) {
      //    $scope.pageTitle = data.title;
      //  });
      //} ]);

      //// Bind to angular route system.
      //$rootScope.$on('$routeChangeSuccess', function(event, route, xx) {
      //  //var _pageTitle;
      //  if (route && angular.isDefined(route.$$route)) {
      //    $pageTitle.set('path.title');
      //    //= route.$$route.pageTitle || null;
      //  }
      //  //_set(_pageTitle);
      //});

    }]);
