'use strict';
angular.module('crackooApp').factory('session', [
  'authService',
  function (Auth) {
    return Auth.deferred.promise;
  }
]).factory('authentication', [
  'session',
  '$q',
  'authService',
  function (status, $q, auth) {
    var $d = $q.defer();
    status.then(function () {
      if (auth.session.status === 'connected' && auth.session.userid !== null) {
        $d.resolve({
          getUser: function () {
            return auth.session;
          }  //session : auth.session,
             //status: auth.session.status,
             //authResponse: auth.session.auth_response
        });
      } else {
        $d.reject('Invalid Session');
      }
    });
    return $d.promise;
  }
])

  .value('app.config', {

    /**Config for local development**/
    //basepath : 'http://localhost:7070/crackoo'

    /** Config for the test server**/
    //basepath : 'http://74.208.7.207:8787/crackoo'
    //basepath : 'https://104.236.223.32:8443/crackoo'


  });
