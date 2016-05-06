'use strict';
angular.module('crackooApp').directive('tableContents', ["$location", "GoalService", "GoalDataService", "StudyItemService", function ($location, goalService, GoalDataService, StudyItemService) {
    return {
      templateUrl: 'views/tableOfContents.html',
      restrict: 'A',
      scope: {
        item: '=',
        answers: '=',
        groups: '=',
		gid : '='
      },
      link: function postLink(scope, element) {
        scope.showChilds = function (group, id) {
          var eID = 'ul#groupId' + id;
          element.find('ul.submenu').addClass('ng-hide');
          element.find(eID).removeClass('ng-hide');  //					group.active = !group.active;
          var children = element.find(eID).find('li').length;
          if(children  == undefined || children <= 0){
            scope.showTopic(group, id);
          }
        };
        scope.oneAtATime = true;
        console.log('scope', scope.groups);

		 scope.showTopic = function(group){
			 //$location.path('/goals/'+ gid +"/topic/" + group.topicId);
       if(scope.gid != undefined && group.topicId != undefined){
         var goals = goalService.getStudyItemsForTopic(group.topicId, scope.gid);
         goals.then(function (res) {
           if(res != undefined && res.length > 0){
             var studyItem = res[0];
             if(studyItem != undefined){
               scope.studyNow(studyItem, scope.gid);
             }
           }
         });
       }
		 };

      scope.studyNow = function (course, gid) {
        GoalDataService.setCurrentGoal(course);
        var its = StudyItemService.getStudyItems(gid);
        its.then(function (response) {
          GoalDataService.setStudyItems(response);
          $location.path('goals/' + gid + '/items/' + response[0].studyItemID);
        });
      };

      }
    };
  }]);
