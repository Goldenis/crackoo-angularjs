'use strict';
angular.module('crackooApp').factory('NoteService', [
  '$rootScope',
  '$ajax',
  '$http',
  'ENV',
  function ($rootScope, $ajax, $http, config) {
    return {
      base_url: config.basepath,
      createNote: function (uid, sId, description) {
        var _self = this;
        var promise = $http({
          method: 'POST',
          url: _self.base_url + '/usernotes/users/' + uid + '/studyitems/' + sId + '/notes',
          data: description
        });
        return promise;
      },
      updateNote: function (userId, notesId, description) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/users/' + userId + '/notes/' + notesId,
          data: description
        });
        return promise;
      },
      deleteNote: function (uId, nId) {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/usernotes/users/' + uId + '/notes/' + nId
        });
        return promise;
      },
      getUserNotes: function (uId, sId) {
        var _self = this;
        var notes = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + uId + '/studyitems/' + sId + '/notes'
        });
        return notes;
      },
      getStudyItemNotes: function (sId) {
        var _self = this;
        var notes = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + sId + '/notes'
        });
        return notes;
      },
      getStudyItemNote: function (sId, nId) {
        var _self = this;
        var note = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + sId + '/notes/' + nId
        });
        return note;
      },
      likeNote: function (sId, nId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/studyitems/' + sId + '/notes/' + nId + '/like'
        });
        return promise;
      },
      dislikeNote: function (sId, nId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/studyitems/' + sId + '/notes/' + nId + '/dislike'
        });
        return promise;
      },
      deleteAllNotes: function () {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/notes'
        });
        return promise;
      }
    };
  }
]);
