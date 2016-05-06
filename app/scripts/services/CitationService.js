'use strict';
angular.module('crackooApp').factory('CitationService', [
  '$rootScope',
  '$ajax',
  '$http',
  'ENV',
  function ($rootScope, $ajax, $http, config) {
    return {
      base_url: config.basepath,
      createCitation: function (uid, studyItemId, citation) {
        var _self = this;
        var promise = $http({
          method: 'POST',
          url: _self.base_url + '/usercitations/users/' + uid + '/studyitems/' + studyItemId + '/citations',
          data: citation
        });
        return promise;
      },
      updateCitation: function (userId, citationId, citation) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/users/' + userId + '/citations/' + citationId,
          data: citation
        });
        return promise;
      },
      deleteCitation: function (uid, citationId) {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/usercitations/users/' + uid + '/citations/' + citationId
        });
        return promise;
      },
      getCitations: function (sid) {
        var _self = this;
        var promise = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + sid + '/citations'
        });
        return promise;
      },
      getStudyItemUserCitations: function (uid, studyItemId) {
        var _self = this;
        var citations = $ajax({
          method: 'GET',
          url: _self.base_url + '/usercitations/users/' + uid + '/studyitems/' + studyItemId
        });
        return citations;
      },
      likeCitation: function (studyItemId, citationId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/studyitems/' + studyItemId + '/citations/' + citationId + '/like'
        });
        return promise;
      },
      dislikeCitation: function (studyItemId, citationId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/studyitems/' + studyItemId + '/citations/' + citationId + '/dislike'
        });
        return promise;
      },
      getCitation: function (studyItemId, citationId) {
        var _self = this;
        var citation = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + studyItemId + '/citations/' + citationId
        });
        return citation;
      }
    };
  }
]);
