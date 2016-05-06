/*---------------------------START OF DOCUMENTATION---------------------------

  This controller maps to StudyItemController.java on the server side

  The conventions used in this code are :
    uId : userId
    gId : goalId
    sId : studyItemId

  The getStudyItems function returns all the Study Items for the given Goal.

  And getStudyItem function returns a Study Item for the given Study Item Id
-----------------------------END OF DOCUMENTATION----------------------------------*/
'use strict';
angular.module('crackooApp').factory('StudyItemService', [
  '$rootScope',
  '$ajax',
  'ENV',
  '$q',
  function ($rootScope, $ajax, config, $q) {
    var mem = [];
    return {
      base_url: config.basepath,
      createStudyItem: function (gId, studyItem) {
        var _self = this;
        var promise = $ajax({
          method: 'POST',
          url: _self.base_url + '/goals/' + gId + '/studyitems',
          data: studyItem
        });
        return promise;
      },
      updateStudyItem: function (gId, sId, studyItem) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/goals/' + gId + '/studyitems/' + sId,
          data: studyItem
        });
        return promise;
      },
      deleteStudyItem: function (gId, sId) {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/goals/' + gId + '/studyitems/' + sId
        });
        return promise;
      },
      getStudyItems: function (gId) {
        var _self = this;
        if (typeof mem[gId] !== 'undefined' && !(mem[gId].length == 0)) {
          console.log('cached');
          console.log(mem[gId]);
          return $q.when(mem[gId]);
        } else {
          var studyItems = $ajax({
            method: 'GET',
            url: _self.base_url + '/goals/' + gId + '/studyitems'
          });
          studyItems.then(function (response) {
            mem[gId] = response;
          });
          return studyItems;
        }
      },
      getStudyItem: function (sId) {
        var _self = this;
        console.log(sId);
        var studyItem = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + sId
        });
        return studyItem;
      },
      deleteAllStudyItems: function () {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/studyitems'
        });
        return promise;
      }
    };
  }
]);
