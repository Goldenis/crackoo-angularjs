'use strict';
angular.module('crackooApp').factory('$ajax', [
  '$http',
  function ($http) {
    var ajax = function (options) {
      var promise = $http(options).then(function (response) {
        //console.log(response);
        //console.log(response.headers());
        //console.log(response.headers('location')); 
        return response.data;
      });
      return promise;
    };
    return ajax;
  }
]);