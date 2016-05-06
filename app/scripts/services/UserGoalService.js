/*---------------------------START OF DOCUMENTATION---------------------------

  This controller maps to UserGoalController.java on the server side

  The conventions used in this code are :
    uId : userId
    gId : goalId
    tId : tagId

  General Overview of the Functions defined below
  1. createGoal   :   Creates a User Goal for existing Goal

  2. deleteGoal   :   Deletes the provided User Goal

  3. getAllGoals  :   Gets all the User Goals for the specified User.
            This method returns an array of Goals.

  4. getGoalCompletionPercent :   Returns the percentage of completion of the
                  particular Goal.

  5. getGoalsByWildCard   :   Gets all the goals by the Wildcard. This method
                returns an Array of Goals.

  6. getGoalsByTags     :   Gets all the goals by a particular Tag. This method
                returns an array of Goals.

-----------------------------END OF DOCUMENTATION----------------------------------*/
'use strict';
angular.module('crackooApp').factory('UserGoalService', [
  '$rootScope',
  '$ajax',
  'ENV',
  function ($rootScope, $ajax, config) {
    return {
      base_url: config.basepath,
      createGoal: function (uId, gId) {
        var _self = this;
        var promise = $ajax({
          method: 'POST',
          url: _self.base_url + '/users/' + uId + '/goals/' + gId + '/study'
        });
        return promise;
      },
      deleteGoal: function (uId, gId) {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/users/' + uId + '/goals/' + gId + '/study'
        });
        return promise;
      },
      getAllGoals: function (uId) {
        var _self = this;
        var userGoals = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + uId + '/usergoals'
        });
        return userGoals;
      },
      getGoalCompletionPercent: function (uId, gId) {
        var _self = this;
        var percent = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + uId + '/goals/' + gId + '/study/completion'
        });
        return percent;
      },
      getGoalsByWildCard: function (uId) {
        var _self = this;
        var goals = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + uId + '/getUserGoalByGoalName'
        });
        return goals;
      },
      getGoalsByTags: function (uId, gId, tId) {
        var _self = this;
        var goals = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + uId + '/goals/' + gId + '/gtags/' + tId + '/usergoalbytag'
        });
        return goals;
      }
    };
  }
]);
