'use strict';
angular.module('crackooApp').factory('AnswerService', [
  '$rootScope',
  '$ajax',
  '$http',
  'ENV',
  function ($rootScope, $ajax, $http, config) {
    return {
      base_url: config.basepath,
      createAnswer: function (uid, qId) {
        var _self = this;
        var promise = $http({
          method: 'POST',
          url: _self.base_url + '/useranswers/users/' + uid + '/questions/' + qId + '/answers',
          data: question
        });
        return promise;
      },
      updateAnswer: function (uid, answerId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/users/' + uid + '/answers/' + answerId,
          data: question
        });
        return promise;
      },
      deleteUserAnswer: function (uId, answerId) {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/users/' + uId + '/answers/' + answerId
        });
        return promise;
      },
      getUserStudyItemAnswers: function (uId, qId) {
        var _self = this;
        var questions = $ajax({
          method: 'GET',
          url: _self.base_url + '/useranswers/users/' + uId + '/questions/' + qId + '/answers'
        });
        return questions;
      },
      getStudyItemAnswer: function (uId, answerId) {
        var _self = this;
        var question = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + uId + '/answers/' + answerId
        });
        return question;
      },
      likeQuestion: function (uId, answerId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/users/' + uId + '/answers/' + answerId + '/like'
        });
        return promise;
      },
      dislikeQuestion: function (userId, answerId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/users/' + userId + '/answers/' + answerId + '/dislike'
        });
        return promise;
      },
      //getAllquestions: function (uId) {
      //  var _self = this;
      //  var questions = $ajax({
      //    method: 'GET',
      //    url: _self.base_url + '/users/' + uId + '/getallquestions'
      //  });
      //  return questions;
      //},
      //deleteAllAnswers: function () {
      //  var _self = this;
      //  var promise = $ajax({
      //    method: 'DELETE',
      //    url: _self.base_url + '/questions'
      //  });
      //  return promise;
      //},
      //getUnansweredQuestions: function (sId) {
      //  var _self = this;
      //  var questions = $ajax({
      //    method: 'GET',
      //    url: _self.base_url + '/questions/studyitems/' + sId + '/unansweredquestion'
      //  });
      //  return questions;
      //}
    };
  }
]);
