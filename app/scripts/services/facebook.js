'use strict';
angular.module('crackooApp').factory('Facebook', [
  '$rootScope',
  '$q',
  function ($rootScope, $q) {
    return {

      getLoginStatus: function () {
        var deferred = $q.defer();
        //console.log('Inside getLoginStatus');
        FB.getLoginStatus(function (response) {
          $rootScope.$apply(function () {
            deferred.resolve(response);
          });
        }, true);
        return deferred.promise;
      },

      initFB: function (apId) {
        FB.init({
          appId: appId,
          channelUrl: '//localhost:9000/channel.html',
          cookie: true,
          xfbml: true,
          status: false
        });
        return promise;
      },


      watchLoginChange: function () {
        //console.log('Inside watchLoginChange');
        FB.Event.subscribe('auth.authResponseChange', function (response) {
          $rootScope.$apply(function () {
            $rootScope.$broadcast('fb_authResponseChange', response);
          });
        });
      },
      getUserProfilePicture: function (username) {
        var deferred = $q.defer();
        FB.api('/' + username + '/picture?type=small&redirect=false', function (response) {
          var url = response.data.url.split('https://')[1];
          //console.log(url);
          $rootScope.$apply(function () {
            deferred.resolve(url);
          });
        });
        return deferred.promise;
      },
      getUserInfo: function () {
        var deferred = $q.defer();
        FB.api('/me', function (response) {
          $rootScope.$apply(function () {
            deferred.resolve(response);
          });
        });
        return deferred.promise;
      },
      logout: function () {
        var deferred = $q.defer();
        FB.logout(function (response) {
          $rootScope.$apply(function () {
            deferred.resolve(response);
          });
        });
        return deferred.promise;
      }
    };
  }
]);
