'use strict';
angular.module('crackooApp').controller('ReportCtrl', [
  'app.config',
  'auth',
  '$routeParams',
  'ReportService',
  'ChartService',
  '$scope',
  '$rootScope',
  'UserStudyItemService',
  '$location',
  'GoalDataService',
  'GoalService',
  function (config, auth, $routeParams, Reports, Charts, $scope, $rootScope, UserStudyItemService, $location, GoalDataService, goalService) {
    var uid = $scope.uid = auth.getUser().email;
    var dashedGid = $scope.dashedGid = $routeParams.id;
    var gid = $scope.gid = ($routeParams.id).replace(/-/g, ' ');

    $scope.type = $routeParams.type;
    var goals = goalService.getGoal(gid);
    goals.then(function (res) {
      $scope.course = res;
    });
    /* Handle Pie charts */
    $rootScope.$on('chart:updated', function (event, data, key) {
      var dashedGid = $scope.dashedGid = $routeParams.id;
      var gid = $scope.gid = ($routeParams.id).replace(/-/g, ' ');

      var its;
      if (key === 'Time Report') {
        console.log('received click notification for time report');
        if (data.data.label === 'Slow') {
          its = UserStudyItemService.getStudyItemsByTimeLevel(uid, gid, 'AA');
          its.then(function (response) {
            console.log(response);
            if (response.length > 0) {
              GoalDataService.setStudyItems(response);
              $location.path('goals/' + dashedGid + '/items/' + response[0].studyItemID);
            }
          });
        } else if (data.data.label === 'Fast') {
           its = UserStudyItemService.getStudyItemsByTimeLevel(uid, gid, 'BA');
          its.then(function (response) {
            console.log(response);
            if (response.length <= 0){
              return;
            }
            GoalDataService.setStudyItems(response);
            $location.path('goals/' + dashedGid + '/items/' + response[0].studyItemID);
          });
        } else if (data.data.label === 'Unattempted') {
           its = UserStudyItemService.getStudyItemsByTimeLevel(uid, gid, 'N');
          its.then(function (response) {
            console.log(response);
            GoalDataService.setStudyItems(response);
            $location.path('goals/' + $scopedashedGid + '/items/' + response[0].studyItemID);
          });
        }
      } else if (key === 'Confidence Report') {
        // console.log("received click notification for Confidence report");
        if (data.data.label === 'Confident') {
          its = UserStudyItemService.getStudyItemsByConfidenceLevel(uid, gid, 'C');
          its.then(function (response) {
            console.log(response);
            GoalDataService.setStudyItems(response);
            $location.path('goals/' + dashedGid + '/items/' + response[0].studyItemID);
          });
        } else if (data.data.label === 'Not Sure') {
          its = UserStudyItemService.getStudyItemsByConfidenceLevel(uid, gid, 'NS');
          its.then(function (response) {
            console.log(response);
            if (response.length <= 0){
              return;
            }
            GoalDataService.setStudyItems(response);
            $location.path('goals/' + dashedGid + '/items/' + response[0].studyItemID);
          });
        } else if (data.data.label === 'Other') {
          its = UserStudyItemService.getStudyItemsByConfidenceLevel(uid, gid, 'O');
          its.then(function (response) {
            console.log(response);
            if (response.length <= 0){
              return;
            }
            GoalDataService.setStudyItems(response);
            $location.path('goals/' + dashedGid + '/items/' + response[0].studyItemID);
          });
        }
      } else if (key === 'Difficulty Report') {
        console.log('received click notification for Difficulty report');
        if (data.data.label === 'Easy') {
          its = UserStudyItemService.getStudyItemsByDifficultyLevel(uid, gid, 'E');
          its.then(function (response) {
            console.log(response);
            if (response.length <= 0){
              return;
            }
            GoalDataService.setStudyItems(response);
            $location.path('goals/' + dashedGid + '/items/' + response[0].studyItemID);
          });
        } else if (data.data.label === 'Difficult') {
           its = UserStudyItemService.getStudyItemsByDifficultyLevel(uid, gid, 'D');
          its.then(function (response) {
            console.log(response);
            if (response.length <= 0){
              return;
            }
            GoalDataService.setStudyItems(response);
            $location.path('goals/' + dashedGid + '/items/' + response[0].studyItemID);
          });
        } else if (data.data.label === 'Other') {
           its = UserStudyItemService.getStudyItemsByDifficultyLevel(uid, gid, 'O');
          its.then(function (response) {
            console.log(response);
            if (response.length <= 0){
              return;
            }
            GoalDataService.setStudyItems(response);
            $location.path('goals/' + dashedGid + '/items/' + response[0].studyItemID);
          });
        }
      } else if (key === 'Review Report') {
        if (data.data.label === 'Needs Review') {
           its = UserStudyItemService.getStudyItemsByReview(uid, gid, 'R');
          its.then(function (response) {
            console.log(response);
            if (response.length <= 0){
              return;
            }
            GoalDataService.setStudyItems(response);
            $location.path('goals/' + dashedGid + '/items/' + response[0].studyItemID);
          });
        } else if (data.data.label === 'Others') {
          its = UserStudyItemService.getStudyItemsByReview(uid, gid, 'O');
          its.then(function (response) {
            console.log(response);
            if (response.length <= 0){
              return;
            }
            GoalDataService.setStudyItems(response);
            $location.path('goals/' +dashedGid + '/items/' + response[0].studyItemID);
          });
        }
      } else if (key === 'Status Report') {
        if (data.data.label === 'Finished') {
           its = UserStudyItemService.getStudyItemsByFinishedStatus(uid, gid, 'F');
          its.then(function (response) {
            if (response.length <= 0){
              return;
            }
            GoalDataService.setStudyItems(response);
            $location.path('goals/' + dashedGid + '/items/' + response[0].studyItemID);
          });
        } else if (data.data.label === 'Unfinished') {
           its = UserStudyItemService.getStudyItemsByFinishedStatus(uid, gid, 'UF');
          its.then(function (response) {
            if (response.length <= 0){
              return;
            }
            GoalDataService.setStudyItems(response);
            $location.path('goals/' + dashedGid + '/items/' + response[0].studyItemID);
          });
        }
      }
    });
    /* Handle Focus(Topic Wise report charts) */
    $rootScope.$on('focus:updated', function (e, focuslabel) {
      var dashedGid = $scope.dashedGid = $routeParams.id;
      var gid = $scope.gid = ($routeParams.id).replace(/-/g, ' ');

      //console.log("e is "+JSON.stringify(e));
      console.log('label is' + focuslabel.point.label);
      console.log('topic Name is ' + focuslabel.e.currentTarget.label);
      var its;
      //console.log("key is" + key);
      var focuskey = focuslabel.series.key;
      if (focuskey === 'UnAttempted') {
        console.log('received click notification for Unattempted study items for topic ');
         its = UserStudyItemService.getStudyItemsByConfidenceLevel(uid, gid, 'C');
        its.then(function (response) {
          console.log(response);
          if (response.length <= 0){
            return;
          }
          GoalDataService.setStudyItems(response);
          $location.path('goals/' + dashedGid + '/items/' + response[0].studyItemID);
        });
      } else if (focuskey === 'Attempted') {
        console.log('received click notification for Attempted Study Items for topic');
        its = UserStudyItemService.getStudyItemsByConfidenceLevel(uid, gid, 'C');
        its.then(function (response) {
          console.log(response);
          if (response.length <= 0){
            return;
          }
          GoalDataService.setStudyItems(response);
          $location.path('goals/' + dashedGid + '/items/' + response[0].studyItemID);
        });
      }
    });
    $scope.$watch('goal', function (newGoal, oldGoal, $scope) {
      $scope.$watch('type', function (newType, oldType, $scope) {
        var uid = $scope.uid;
       // var gid = $scope.gid;
        //gid = gid.replace(/-/g, ' ');

        var container = '.referenceList svg';
        var timeframe = 'DAILY';
        switch (newType) {
        //status report
        case 'status':
          $scope.title = 'Goal Completion Status';
          $location.path('/report/' + dashedGid + '/status').replace();
          angular.element(container).html('');
          Reports.getStatusReport(uid, $scope.gid).then(function (response) {
            console.log(response);
            Charts.pie({ children: response }, container);
          });
          break;
        case 'studyactivity':
          $scope.title = 'Study Activity Report';
          $location.path('/report/' + dashedGid + '/studyactivity').replace();
          angular.element(container).html('');
          Reports.getStudyactivityData(uid, gid, timeframe).then(function (response) {
            console.log('study activity response is', response);
            Charts.stacked({ children: response }, container);
          });
          break;
        case 'focus':
          $scope.title = 'Focus Report';
          $location.path('/report/' + dashedGid + '/focus').replace();
          angular.element(container).html('');
          Reports.getFocusData(uid, gid).then(function (response) {
            Charts.bar({ children: response }, container);
          });
          break;
        case 'progress':
          $scope.title = 'Daily Progress Report';
          $location.path('/report/' + dashedGid + '/progress').replace();
          angular.element(container).html('');
          Reports.getProgressData(uid, gid, timeframe).then(function (response) {
            Charts.line({ children: response }, container);
          });
          break;
        case 'confidencelevel':
          $scope.title = 'Confidence Level Report';
          $location.path('/report/' + dashedGid + '/confidencelevel').replace();
          angular.element(container).html('');
          Reports.getConfidencelevel(uid, gid).then(function (response) {
            console.log(response);
            Charts.pie({ children: response }, container);
          });
          break;
        case 'timelevel':
          $scope.title = 'Time Level Report';
          $location.path('/report/' + dashedGid + '/timelevel').replace();
          angular.element(container).html('');
          Reports.getTimelevel(uid, gid).then(function (response) {
            Charts.pie({ children: response }, container);
          });
          break;
        case 'difficultylevel':
          $scope.title = 'Difficult Level Report';
          $location.path('/report/' + dashedGid + '/difficultylevel').replace();
          angular.element(container).html('');
          Reports.getDifficultylevel(uid, gid).then(function (response) {
            Charts.pie({ children: response }, container);
          });
          break;
        case 'review':
          $scope.title = 'Review Report';
          $location.path('/report/' + dashedGid + '/review').replace();
          angular.element(container).html('');
          Reports.getReviewReport(uid, gid).then(function (respose) {
            Charts.pie({ children: respose }, container);
          });
          break;
        }
      });
    });
  }
]);
