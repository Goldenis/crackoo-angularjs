/**
 * Created by rizwanahmed on 4/1/14.
 */
/*---------------------------------START OF DOCUMENTATION--------------------------------------------

 This service is used for getting the current list of study items.
 The study items in this service are updated by different controllers based on context and is served by the study item
 controller.

 -----------------------------------END OF DOCUMENTATION----------------------------------------------*/
'use strict';
angular.module('crackooApp').factory('GoalDataService', [
  '$q',
  'StudyItemService',
  function ($q, studyItemService) {
    var current_goal;
    var its;
    var studyItemIdToStudyItemMap;

    function getCurrentGoal() {
      return current_goal;
    }
    /** The only place this can be set is when a user clicks on the Study Now Button **/
    function setCurrentGoal(goal) {
      current_goal = goal;
    }
    function getStudyItems(goalId) {
      //var _self = this;
      var $d = $q.defer();
      if (typeof its != "undefined" && its !== null) {
        $d.resolve(its);
      } else {
        var studyItems = studyItemService.getStudyItems(goalId);
        studyItems.then(function (response) {
          its = response;
          $d.resolve(its);
        });
      }
      return $d.promise;
    }
    function setStudyItems(studyItems) {
      its = studyItems;
    }

    function getStudyItemMap(goalId) {
      var _self = this;
      var $d = $q.defer();
      if (typeof studyItemIdToStudyItemMap != "undefined" && studyItemIdToStudyItemMap !== null && goalId == current_goal) {
        $d.resolve(studyItemIdToStudyItemMap);
      } else {
        var studyItems = _self.getStudyItems(goalId);
        studyItemIdToStudyItemMap = new Map();
        studyItems.then(function (res){
          for (var i = 0; i < res.length; i += 1) {
            studyItemIdToStudyItemMap.set(res[i].studyItemID, res[i]);
            res[i].number = i;
            if (i > 0) {
              res[i].prevItem = res[i - 1];
            }
            if (i + 1 < res.length) {
              res[i].nextItem = res[i + 1];
            }
            if (i === 0) {
              res[i].prevItem = 'start';
            }
            if (i === res.length - 1) {
              res[i].nextItem = 'end';
            }
          }
          $d.resolve(studyItemIdToStudyItemMap);
        });
      }
      return $d.promise;
    }


    return {
      getCurrentGoal: getCurrentGoal,
      setCurrentGoal: setCurrentGoal,
      getStudyItems: getStudyItems,
      setStudyItems: setStudyItems,
      getStudyItemMap: getStudyItemMap
    };
  }
]);
