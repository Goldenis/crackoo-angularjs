/*---------------------------------START OF DOCUMENTATION--------------------------------------------

      This controller maps to UserStudyItemController.java on the server side code

      Conventions used in the following code:
        uId : userId
        gId : goalId
        sId : studyItemId

      General Overview of the Functions:
        1. createStudyItem  :   Creates a User Study Item for an existing Study Item

        2. updateStudyItem  :   Updates the given User Study Item, here studyItem is passed
                    as the modified data.

        3. getStudyItem   :   Gets a particular User Study Item pertaining to particular
                    user Study Item Id provided. This method returns a single
                    Study Item.

        4. getStudyItems  :   Gets all the User Study Items pertaining to the given Goal
                    This method returns an Array of UserStudyItems

        5. getUserStudyItemResult : Gets the result data for the given User Study Item

    -----------------------------------END OF DOCUMENTATION----------------------------------------------*/
'use strict';
angular.module('crackooApp').factory('UserStudyItemService', [
  '$rootScope',
  '$ajax',
  'ENV',
  function ($rootScope, $ajax, config) {
    return {
      base_url: config.basepath,
      createStudyItem: function (uId, gId, sId) {
        var _self = this;
        var promise = $ajax({
          method: 'POST',
          url: _self.base_url + '/userstudyitems/users/' + uId + '/goals/' + gId + '/studyitems/' + sId + '/study'
        });
        return promise;
      },
      updateStudyItem: function (uId, gId, sId, studyItem) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/userstudyitems/users/' + uId + '/goals/' + gId + '/studyitems/' + sId,
          data: studyItem
        });
        return promise;
      },
      getStudyItem: function (uId, gId, sId) {
        var _self = this;
        var studyItem = $ajax({
          method: 'GET',
          url: _self.base_url + '/userstudyitems/users/' + uId + '/goals/' + gId + '/studyitems/' + sId
        });
        return studyItem;
      },
      getStudyItems: function (uId, gId) {
        var _self = this;
        var studyItems = $ajax({
          method: 'GET',
          url: _self.base_url + '/userstudyitems/users/' + uId + '/goals/' + gId + '/studyitems/'
        });
        return studyItems;
      },
      getUserStudyItemResult: function (uId, sId) {
        var _self = this;
        var studyItems = $ajax({
          method: 'GET',
          url: _self.base_url + '/userstudyitems/users/' + uId + '/studyitems/' + sId + '/results'
        });
        return studyItems;
      },
      getCommunityStudyItemResult: function (sId) {
        var _self = this;
        var studyItems = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + sId + '/communityresults'
        });
        return studyItems;
      },
      getAverageStudyTime: function (sId) {
        var _self = this;
        var studyItems = $ajax({
          method: 'GET',
          url: _self.base_url + '/userstudyitems/studyitems/' + sId + '/time'
        });
        return studyItems;
      },
      /* Get all the user studyitems for a given goal based on the confidence level*/
      getStudyItemsByConfidenceLevel: function (uId, goalId, confidence) {
        var _self = this;
        var studyItems = $ajax({
          method: 'GET',
          url: _self.base_url + '/userstudyitems/users/' + uId + '/goals/' + goalId + '/confidence/' + confidence
        });
        return studyItems;
      },
      /* Get the user study items by average time spent on the studying it.*/
      getStudyItemsByTimeLevel: function (uId, goalId, timelevel) {
        var _self = this;
        var studyItems = $ajax({
          method: 'GET',
          //url : _self.base_url+'/userstudyitems/users/'+uId + '/goals/' + goalId + '/confidence/' + confidence
          url: _self.base_url + '/userstudyitems/users/' + uId + '/goals/' + goalId + '/timelevel/' + timelevel
        });
        return studyItems;
      },
      /* Get the user study items by difficulty level of the study item.*/
      getStudyItemsByDifficultyLevel: function (uId, goalId, difficultylevel) {
        var _self = this;
        var studyItems = $ajax({
          method: 'GET',
          //url : _self.base_url+'/userstudyitems/users/'+uId + '/goals/' + goalId + '/confidence/' + confidence
          url: _self.base_url + '/userstudyitems/users/' + uId + '/goals/' + goalId + '/difficultylevel/' + difficultylevel
        });
        return studyItems;
      },
      getStudyItemsByReview: function (uid, gid, review) {
        var _self = this;
        var studyItems = $ajax({
          method: 'GET',
          url: _self.base_url + '/userstudyitems/users/' + uid + '/goals/' + gid + '/review/' + review
        });
        return studyItems;
      },
      getStudyItemsByFinishedStatus: function (uid, gid, status) {
        var _self = this;
        var studyItems = $ajax({
          method: 'GET',
          url: _self.base_url + '/userstudyitems/users/' + uid + '/goals/' + gid + '/finished/' + status
        });
        return studyItems;
      }
    };
  }
]);
