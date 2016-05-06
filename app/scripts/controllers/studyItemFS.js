'use strict';
angular.module('crackooApp').controller('StudyitemfsCtrl', [
  '$scope',
  '$routeParams',
  'StudyItemService',
  'ChoiceService',
  '$location',
  'UserStudyItemService',
  'CommentService',
  'QuestionService',
  'auth',
  function ($scope, config, $routeParams, items, choices, $location, USI, Comments, Questions, auth) {
    $scope.title = 'Study Play : GRE Prep';
    $scope.chArr = [
      'A',
      'B',
      'C',
      'D',
      'E'
    ];
    var id = $scope.id = $routeParams.id;
    var gid = $scope.gid = $routeParams.gid;
    var uid = $scope.uid = auth.authResponse.userID;
    //var comments = $scope.comments = Comments.getComments(id);
    var myComments = $scope.myComments = Comments.getUserComments(uid, id);
    //var questions = $scope.Qs = Questions.getStudyItemQuestions(id);
    var myQs = $scope.myQs = Questions.getUserStudyItemQuestions(uid, id);
    //var usi = $scope.usi = USI.getStudyItem(uid, gid, id);
    $scope.q_main = 'views/question/main.html';
    $scope.tab_q = 'views/question/tab_q.html';
    $scope.tab_c = 'views/question/tab_c.html';
    $scope.tab_n = 'views/question/tab_n.html';
    $scope.state = { 'activetab': 'q' };
    $scope.addQuestion = function () {
      var data = angular.element('textarea.comment').val();
      var newQ = {
        id: '',
        description: data,
        likes: 0,
        dislikes: 0,
        answerCount: 0
      };
      myQs.then(function (response) {
        response.unshift(newQ);
      });
      console.log(myQs);
      angular.element('textarea.comment').val('');
      //update the server
      Questions.createQuestion(uid, id, data);
    };
    $scope.addComment = function () {
      var data = angular.element('input.comment').val();
      var newComment = { description: data };
      myComments.then(function (response) {
        response.unshift(newComment);
      });
      angular.element('input.comment').val('');
      console.log(myComments);
      //update the server
      Comments.createComment(uid, id, data).then(function (response) {
        console.log(response);
      });
    };
    $scope.displayAns = 'false';
    $scope.ansSelected = '';
    $scope.ansColor = function (cid) {
      //console.log(cid);
      if ($scope.ansSelected === cid) {
        return 'answer selected';
      } else {
        return 'answer';
      }
    };
    $scope.toggleSelect = function (cid) {
      console.log('answer selected');
      $scope.ansSelected = cid;  //send it to server
    };
    //$scope.ansCircleColor = function (cid) {
    //  //console.log(cid);
    //  return 'answer-circle';
    //};
    $scope.activate = function (tab, $event) {
      $scope.state.activetab = tab;
      $('#tabbar .active').removeClass('active').addClass('inactive');
      $($event.target).removeClass('inactive').addClass('active');
    };
    var its = $scope.its = items.getStudyItems(gid);
    var num = 1;
    its.then(function (res) {
      console.log(id);
      console.log(res);
      for (var i = 0; i < res.length; i += 1) {
        if (res[i].studyItemID === id) {
          $scope.number = num;
          $scope.item = res[i];
          if (i > 0) {
            $scope.prevItem = res[i - 1].studyItemID;
          }
          if (i + 1 < res.length) {
            $scope.nextItem = res[i + 1].studyItemID;
          }
          if (i === 0) {
            $scope.prevItem = 'start';
          }
          if (i === res.length - 1) {
            $scope.nextItem = 'end';
          }
          break;
        }
        num += 1;
      }
      if ($scope.item.studyItemType === 'P') {
        $scope.answers = choices.getStudyItemChoices($scope.item.studyItemID);
      }
    });
    $scope.toggleExpand = function () {
      $location.path('/goals/' + gid + '/items/' + id);
    };
    $scope.move = function (sid) {
      console.log('move to ' + sid);
      if (sid === 'start' || sid === 'end') {
      } else {
        $location.path('/goals/' + gid + '/items/' + sid + '/fullscreen');
      }
    };
  }
]);
