'use strict';
angular.module('crackooApp').factory('QuestionService', [
  '$rootScope',
  '$ajax',
  '$http',
  'ENV',
  function ($rootScope, $ajax, $http, config) {
    return {
      base_url: config.basepath,
      createQuestion: function (uid, sId, question) {
        var _self = this;
        var promise = $http({
          method: 'POST',
          url: _self.base_url + '/userquestions/users/' + uid + '/studyitems/' + sId + '/questions',
          data: question
        });
        return promise;
      },
      updateQuestion: function (userId, questionId, question) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/userquestions/users/' + userId + '/questions/' + questionId,
          data: question
        });
        return promise;
      },
      deleteUserQuestion: function (uId, qId) {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/userquestions/users/' + uId + '/questions/' + qId
        });
        return promise;
      },
      getUserStudyItemQuestions: function (uId, sId) {
        var _self = this;
        var questions = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + uId + '/studyitems/' + sId + '/questions'
        });
        return questions;
      },
      getStudyItemQuestions: function (sId) {
        var _self = this;
        var questions = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + sId + '/questions'
        });
        return questions;
      },
      getStudyItemQuestion: function (sId, qId) {
        var _self = this;
        var question = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + sId + '/questions/' + qId
        });
        return question;
      },
      likeQuestion: function (uId, qId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/users/' + uId + '/questions/' + qId + '/like'
        });
        return promise;
      },
      dislikeQuestion: function (userId, questionId) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/users/' + userId + '/questions/' + questionId + '/dislike'
        });
        return promise;
      },
      getQuestionsByTag: function () {
        var _self = this;
        var questions = $ajax({
          method: 'GET',
          url: _self.base_url + '/questions/getallquestions'
        });
        return questions;
      },
      getAllquestions: function (uId) {
        var _self = this;
        var questions = $ajax({
          method: 'GET',
          url: _self.base_url + '/users/' + uId + '/getallquestions'
        });
        return questions;
      },
      deleteAllQuestions: function () {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/questions'
        });
        return promise;
      },
      getUnansweredQuestions: function (sId) {
        var _self = this;
        var questions = $ajax({
          method: 'GET',
          url: _self.base_url + '/questions/studyitems/' + sId + '/unansweredquestion'
        });
        return questions;
      }
    };
  }
]);
