'use strict';
angular.module('crackooApp').factory('GoalService', [
  '$rootScope',
  '$ajax',
  'ENV',
  function ($rootScope, $ajax, config) {
    return {
      base_url: config.basepath,
      /* Get all goals */
      getAllGoals: function () {
        var _self = this;
        var promise = $ajax({
          method: 'GET',
          url: _self.base_url + '/goals',
          cache: true
        });
        return promise;
      },
      /* Get goal for a particular goal id */
      getGoal: function (gId) {
        var _self = this;
        var promise = $ajax({
          method: 'GET',
          url: _self.base_url + '/goals/' + gId
        });
        return promise;
      },
      /* User starts studying the goal */
      studyGoal: function (uId, gId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/users/' + uId + '/goals/' + gId + '/study'
        });
        return promise;
      },
      /* Gets all Study Items for particular Goal */
      getStudyItemsForGoal: function (goalId) {
        var _self = this;
        var studyItems = $ajax({
          method: 'GET',
          url: _self.base_url + '/goals/' + goalId + '/studyitems'
        });
        return studyItems;
      },
      /*  Gets all the User Study Items for a particular Goal.
      User Study Items refer to the study items created by
      a particular user on a certain Goal. */
      getUserStudyItems: function (userId, goalId) {
        var _self = this;
        var userStudyItems = $ajax({
          method: 'GET',
          url: _self.base_url + '/userstudyitems/users/' + userId + '/goals/' + goalId + '/studyitems'
        });
        return userStudyItems;
      },
      /*  Gets all the Questions related to a particular
      Study Item. */
      getStudyItemQuestions: function (studyItemId) {
        var _self = this;
        var questions = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + studyItemId + '/questions'
        });
        return questions;
      },
      /*  Gets all the Questions created by the user
      for particular Study Item */
      getUserStudyItemQuestions: function (userId, studyItemId) {
        var _self = this;
        var userQuestions = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + userId + '/studyitems/' + studyItemId + '/questions'
        });
        return userQuestions;
      },
      /*  Gets all the notes associated with
      particular Study Item */
      getStudyItemNotes: function (studyItemId) {
        var _self = this;
        var notes = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + studyItemId + '/notes'
        });
        return notes;
      },
      /*  Gets all the User Notes created by the User
      for particular Study Item */
      getUserStudyItemNotes: function (userId, studyItemId) {
        var _self = this;
        var userNotes = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + userId + '/studyitems/' + studyItemId + '/notes'
        });
        return userNotes;
      },
      /*  Gets all the comments for Study Item */
      getStudyItemComments: function (studyItemId) {
        var _self = this;
        var comments = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + studyItemId + '/comments'
        });
        return comments;
      },
      /*  Gets all the Goal Categories*/
      getGoalTags: function () {
        var _self = this;
        var tags = $ajax({
          method: 'GET',
          url: _self.base_url + '/categories/goals'
        });
        return tags;
      },
      /*  Get Goals for Category*/
      getTagGoals: function (categoryName) {
        var _self = this;
        var tags = $ajax({
          method: 'GET',
          url: _self.base_url + '/goals/category/' + categoryName
        });
        return tags;
      },

      /**
       * Get all the study items for a particular Goal topic
       * **/
      getStudyItemsForTopic: function (topicId, gId) {
        var _self = this;
        var studyItem = $ajax({
          method: 'GET',
          url: _self.base_url + '/goals/' + gId+ '/topic/' + topicId + '/studyitems'
        });
        return studyItem;
      },

      getNestedTopicList: function (goalId) {
        var _self = this;
        var topics = $ajax({
          method: 'GET',
          url: _self.base_url + '/goals/' + goalId + '/toc/topics-nested'
        });
        return topics;
      }
    };
  }
]);
