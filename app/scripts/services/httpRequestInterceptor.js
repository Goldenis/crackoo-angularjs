'use strict';
angular.module('crackooApp').factory('httpRequestInterceptor',[
  '$rootScope',
  '$location',
   function () {
  var cur_authType = null;
  var cur_token;
  var cur_expiresIn;
  var cur_email;
  var setAuthHeaders = function setAuthHeaders(email, authType, token, expiresIn) {
    if (email == null || email == 'undefined' || authType == null || authType == 'undefined' || token == null || token == 'undefined' ){
      $location.path('/login');
    }
    cur_email = email;
    cur_authType = authType;
    cur_token = token;
    cur_expiresIn = expiresIn;
  };
  //return {
  var request = function (config) {

    config.headers = {
      'email' : cur_email,
      'APIKEY': '9d4b52d2c345b5c6695b',
      'authtype': cur_authType,
      'token': cur_token,
      'expiresIn': cur_expiresIn,
      'Content-Type': 'application/json'
      //'X-Frame-Option': 'SAMEORIGIN'
    };
    return config;
  };
  return {
    setAuthHeaders: setAuthHeaders,
    request: request
  };  //};
}]);
