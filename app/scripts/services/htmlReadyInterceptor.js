'use strict';
angular.module('crackooApp').factory('htmlReadyInterceptor', [
  '$q','$injector',function ($q, $injector) {
    var $http;
    var error;
    function success(response) {
      $http = $http || $injector.get('$http');
      var $timeout = $injector.get('$timeout');
      var $rootScope = $injector.get('$rootScope');
      if($http.pendingRequests.length < 1) {
        $timeout(function(){
          if($http.pendingRequests.length < 1){
            $rootScope.htmlReady();
          }
        }, 1800);//an 0.7 seconds safety interval, if there are no requests for 0.7 seconds, it means that the app is through rendering
      }
      return response;
    }

    function error(response) {
      $http = $http || $injector.get('$http');

      return $q.reject(response);
    }

    return function (promise) {
      return promise.then(success, error);
    }
}]);
