'use strict';
angular.module('crackooApp').factory('UserService', [
  '$q',
  '$rootScope',
  '$location',
  '$ajax',
  'Facebook',
  'ENV','$http',
  function ($q, $rootScope, $location, $ajax, Facebook, config, $http) {
    return {
      info: {},
      base_url: config.basepath,
      getInfo: function () {
        var _self = this;
        var promise = Facebook.getUserInfo();
        var ret = promise.then(function (response) {
          _self.info = response;
          //console.log(_self.info);
          return response;
        });
        return ret;
      },
      getUserData:function(){
        return $http.get('http://localhost:8080/crackoo/profile');
      },
      getProfilePicture: function (username) {
        //var _self = this;
        if (username === '' || username === null || username === undefined) {
          username = 'me';
        }
        var promise = Facebook.getUserProfilePicture(username);
        return promise;
      },
      isNewUser: function (id) {
        var _self = this;
        var promise = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/exists/' + id
        });
        return promise;
      },
      createNewUser: function (id) {
        var _self = this;
        var promise = $ajax({
          method: 'POST',
          url: _self.base_url + '/users',
          //TODO : correct the create new user url
          data: id
        });
        return promise;
      },
      /* This service will register the user automatically if it is not already registered*/
      registerFBUser: function (id) {
        var _self = this;
        var promise = $ajax({
          method: 'POST',
          url: _self.base_url + '/users/fb',
          data: id
        });
        return promise;
      },
      getDashboard: function () {
        var _self = this;
        var db = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + _self.info.id + '/dashboard'
        });
        return db;
      },
      getFriendsActivity: function () {
        var _self = this;
        var fa = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + _self.info.id + '/friendsactivity'
        });
        return fa;
      },
      getGoals: function () {
        var _self = this;
        var goals = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + _self.info.id + '/usergoals'
        });
        return goals;
      },
      getQuestions: function () {
        var _self = this;
        var qs = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + _self.info.id + '/getallquestions'
        });
        return qs;
      }
    };
  }
]);
