'use strict';
function routeLoggedUser($rootScope, $location) {
  if ($rootScope.redirectURL) {
    var url = $rootScope.redirectURL;
    $rootScope.redirectURL = undefined;
    $location.path(url);
  } else if ($location.path() === '/' || $location.path() === '/courses' || $location.path() === '/login' || $location.path() === '/fb/register') {
    $location.path('/courses');
  } else {
    $location.path($location.path());
  }
}
function routeLoggedInUser($location) {
  if ($location.path() === '/' || $location.path() === '/courses') {
    $location.path('/courses');
  }
}
angular.module('crackooApp').factory('authService', [
  '$rootScope',
  '$location',
  'Facebook',
  'UserService',
  'GoalDataService',
  'httpRequestInterceptor',
  '$window', 'localStorageService', '$q','$auth',
  function ($rootScope, $location, Facebook, User, GoalDataService, httpRequestInterceptor, $window, localStorageService, $q, $auth) {
    var _self = this;
    var auth = {
      session: {
        status: 'unknown', /** is connected when user is logged in**/
        email: null,
        userid: null,
        displayName: null,
        authType: null,
        imgUrl: null,
        isLogged: false,
        accessToken: null
      },
      deferred: '',

      getLoginStatus: function () {
        var deferred = $q.defer();
        var status = Facebook.getLoginStatus();
        status.then(function (response) {
          if (response.status === 'connected') {
            auth.session.status = 'connected';
            auth.session.accessToken = response.authResponse.accessToken;
            auth.session.expiresIn = response.authResponse.expiresIn;
          }
          deferred.resolve(response.status);
        });
        return deferred.promise;
      },

      getAuthType: function () {
        return localStorageService.get("authType");

      },

      isLogged: function () {
        return localStorageService.get("isLogged");
      },

      doFBSignIn: function () {
        var userInfo = Facebook.getUserInfo();
        userInfo.then(function (response) {
          console.log("Facebook user info" + response);
          var profileImage = Facebook.getUserProfilePicture(response.id);
          profileImage.then(function (resp_img) {
            auth.session.imgUrl = 'https://' + resp_img;
            auth.session.email = response.email;
            auth.session.userid = response.id;
            auth.session.displayName = response.first_name;

            httpRequestInterceptor.setAuthHeaders(auth.session.email, 'FB', auth.session.accessToken, auth.session.expiresIn);
            var userData = {
              userid: auth.session.userid,
              email: auth.session.email,
              username: auth.session.displayName,
              imgUrl: auth.session.imgUrl
            };
            User.registerFBUser(userData).then(function () {
              //if(isNew == 'false') User.createNewUser(auth.session.auth_response.userID);
              //auth.session.displayName = auth.session.fbuserinfo.first_name;
              //console.log('registering new user in th system');
              //console.log
              localStorageService.set("authType", "FB");
              auth.session.authType = 'FB';

              //hack
              //rupinkumar@gmail.com
              //104124354171174963416
              //auth.session.userid = "104124354171174963416";
              //auth.session.email = "rupinkumar@gmail.com";

              //auth.session.userid = "115947228399485364941";
              //auth.session.email = "shahrishika24@gmail.com";

              //auth.session.userid = "105615845136475927254";
              //auth.session.email = "narendermaddela@gmail.com";

              //auth.session.userid = "10205599884490791";
              //auth.session.email = "sreenivas.balasubramanian@gmail.com";



              //hack
              auth.deferred.resolve({});
              routeLoggedUser($rootScope, $location);
            });
          });
        });
      },


      loginFBUser: function () {
        var _self = this;
        if (auth.session.status === 'connected') {
          auth.doFBSignIn();
        }
      },


      doGoogleSignIn: function () {
        if (auth.session.status == 'connected'){
          routeLoggedUser($rootScope,$location);
            return;
        }
        //var _self = this;
        auth.session.token = gapi.auth.getToken().access_token;
        auth.session.expiresIn = gapi.auth.getToken().expires_in;
        auth.session.isLogged = 'true';
        auth.session.status = "connected";
        localStorageService.set("authType", "GPLUS");

        gapi.client.load('plus', 'v1', function () {
          var request = gapi.client.plus.people.get({'userId': 'me'});
          request.execute(function (resp) {
            console.log('google authentication response is ', resp);
            auth.session.authType = 'GPLUS';
            auth.authResponse = resp;
            auth.session.status = 'connected';
            auth.session.email = resp.emails[0].value;
            auth.session.displayName = resp.displayName;
            auth.session.userid = resp.id;
            auth.session.imgUrl = resp.image.url;

            httpRequestInterceptor.setAuthHeaders(auth.session.email, 'GPLUS', auth.session.token, auth.session.expiresIn);

            var userdata = {
              userid: auth.session.userid,
              email: auth.session.email,
              username: auth.session.displayName,
              imgUrl: auth.session.imgUrl
            };

            User.registerFBUser(userdata).then(function () {
              auth.deferred.resolve({});
              routeLoggedUser($rootScope, $location);
            });
          });
        });
      },
      logout: function () {
        try {
          if (auth.session.authType == 'FB') {
            Facebook.logout(auth.session.response);
          } else if (auth.session.authType == 'GPLUS') {
            gapi.auth.signOut();
          }
        }
        catch (error) {
          console.log("error logging out" + error);
        }
        auth.session.isLogged = 'false';
        auth.session.status = 'unknown';
        localStorageService.set("authType", "");
        GoalDataService.setCurrentGoal(null);
        $auth.logout()
          .then(function() {
            $location.path('/');
          });
      },

      handleFBAuth: function () {
        if (auth.session.status == 'connected'){
          routeLoggedUser($rootScope,$location);
          return;
        }
        var status = auth.getLoginStatus();
        status.then(function (response) {
          if (response == 'connected') {
            auth.loginFBUser();
          } else if (typeof next != 'undefined' && next && next.$$route && next.$$route.secure !== undefined && next.$$route.secure === true) {
            var authType = auth.getAuthType();
            var isLogged = auth.isLogged();
            if (!(Auth.session.status == 'connected') && !($location.path() == '/')) {
              $location.path('/login/' + encodeURIComponent($location.path()));
            }
          }
        });
      },

      checkGoogleLogin: function () {
        if (gapi.auth.getToken() && gapi.auth.getToken().status.signed_in) {
          return true;
        }
      },
      watchFacebookLoginChange: function () {
        Facebook.watchLoginChange();
      },

      loginGoogle: function () {
        //if (gapi != null && typeof  gapi != 'undefined' && gapi.authorize != null && gapi.authorize != 'undefined') {
        var authDeferred = $q.defer();
        $window.gapi.auth.authorize({
          client_id: '957635322343-jmmkn962pq9vsuu8j0chvhpjasvop1pu.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
          immediate: true
        }, $window.signinCallback);
        return authDeferred.promise;
      },

      loginCrackoo: function(response){
        console.log('crackoo authentication response is ', response);
        auth.session.authType = 'CRACKOO';
        auth.authResponse = response;
        auth.session.status = 'connected';
        auth.session.email = response.email;
        if(response.name != '' && response.name != undefined){
          auth.session.displayName = response.name;
        }else if(response.username != '' && response.username != undefined){
          auth.session.displayName = response.username;
        }else{
          auth.session.displayName = "Crackoo User";
        }

        auth.session.userid = response.userid;
        if(response.imgUrl != undefined){
          auth.session.imgUrl = response.imgUrl;
        }else{
          auth.session.imgUrl = "http://localhost:8100/img/misc/avatar.jpg";
        }

      }

    }


    //handles error during a route change
    $rootScope.$on('$routeChangeError', function () {
      console.log('Route Change Error');
      $location.path('/');
    });
    //GOOGLE LOGIN
    $rootScope.$on('event:google-plus-signin-success', function () {
      auth.doGoogleSignIn();
    });
    $rootScope.$on('event:google-plus-signin-failure', function () {
      // Auth failure or signout detected
      //console.log('google auth failure or sign OUT detected');
      //localStorageService.set("isLogged", "false");
      auth.logout();
    });
    //GOOGLE LOGIN

    //Updates the session on its expiry
    function handleFBLogin(response) {
      if (auth.session.status !== response.status && response.status === 'connected') {
        auth.session.status = 'connected';
        auth.session.accessToken = response.authResponse.accessToken;
        auth.session.expiresIn = response.authResponse.expiresIn;

        auth.doFBSignIn();


        auth.session.isLogged = true;
        auth.authResponse = response.authResponse;
        auth.session.status = response.status;
        auth.session.response = response;
        auth.session.fbuserinfo = response.fbuserinfo;
        console.log(auth.session);
        /** redirect logic from login('/') page **/
      } else if (auth.session.status !== response.status && response.status !== 'connected') {
        auth.authResponse = response.authResponse;
        auth.session.status = response.status;
        //auth.session.fbuserinfo = response.fbuserinfo;
        /** FIXME not sure if another auth.logout is needed here. so commenting out for now**/
          //auth.logout();
        $location.path('/');
      }
    }

    $rootScope.$on('fb_authResponseChange', function (event, response) {
      handleFBLogin(response);
    });

    return auth;
  }
]);
