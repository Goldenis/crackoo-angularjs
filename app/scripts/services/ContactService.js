'use strict';
angular.module('crackooApp').factory('ContactService', [
  '$rootScope',
  '$ajax',
  '$http',
  'ENV',
  function ($rootScope, $ajax, $http, config) {
    return {
      base_url: config.basepath,
      createContact: function (contact) {
        var _self = this;
        var promise = $ajax({
          method: 'POST',
          url: _self.base_url + '/contact',
          data: contact
        });
        return promise;
      }
    };
  }
]);
