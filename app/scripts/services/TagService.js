/*---------------------------START OF DOCUMENTATION---------------------------

  This controller maps to TagController.java on the server side

  The conventions used in this code are :
    uId : userId
    gId : goalId
    tId : tagId
    sId : studyItemId

  There are 2 types of tags defined in the Model. Study Item Tag is the tag
  related with study items. All the functions dealing with study item tag
  have study item as a prefix to tag.
  Goal tag are the tags related to goals. ALl the functions with goal as prefix
  to tag deal with goal tags.

  Also, Please keep in mind that plural ending get functions return an array
  of tags.

-----------------------------END OF DOCUMENTATION----------------------------------*/
'use strict';
angular.module('crackooApp').factory('TagService', [
  '$rootScope',
  '$ajax',
  'ENV',
  function ($rootScope, $ajax,config) {
    return {
      base_url: config.basepath,
      createStudyItemTag: function (sId, description) {
        var _self = this;
        var promise = $ajax({
          method: 'POST',
          url: _self.base_url + '/studyitems/' + sId + '/tags',
          data: description
        });
        return promise;
      },
      updateStudyItemTag: function (sId, tId, description) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/studyitems/' + sId + '/tags/' + tId,
          data: description
        });
        return promise;
      },
      deleteStudyItemTag: function (sId, tId) {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/studyitems/' + sId + '/tags/' + tId
        });
        return promise;
      },
      getUserStudyItemTags: function (uId, sId) {
        var _self = this;
        var tags = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + uId + '/studyitems/' + sId + '/tags'
        });
        return tags;
      },
      getStudyItemTags: function (sId) {
        var _self = this;
        var tags = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + sId + '/tags'
        });
        return tags;
      },
      getStudyItemTag: function (sId, tId) {
        var _self = this;
        var tag = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + sId + '/tags/' + tId
        });
        return tag;
      },
      likeStudyItemTag: function (sId, tId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/studyitems/' + sId + '/tags/' + tId + '/like'
        });
        return promise;
      },
      dislikeStudyItemTag: function (sId, tId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/studyitems/' + sId + '/tags/' + tId + '/dislike'
        });
        return promise;
      },
      createGoalTag: function (gId, description) {
        var _self = this;
        var promise = $ajax({
          method: 'POST',
          url: _self.base_url + '/goals/' + gId + '/gtags',
          data: description
        });
        return promise;
      },
      updateGoalTag: function (gId, tId, description) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/goals/' + gId + '/gtags/' + tId,
          data: description
        });
        return promise;
      },
      deleteGoalTag: function (gId, tId) {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/goals/' + gId + '/gtags/' + tId
        });
        return promise;
      },
      likeGoalTag: function (gId, tId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/goals/' + gId + '/gtags/' + tId + '/like'
        });
        return promise;
      },
      dislikeGoalTag: function (gId, tId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/goals/' + gId + '/gtags/' + tId + '/dislike'
        });
        return promise;
      },
      deleteAllTags: function () {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/tags'
        });
        return promise;
      }
    };
  }
]);
