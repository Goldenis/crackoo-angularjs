'use strict';
angular.module('crackooApp').factory('AnswerService', [
  '$rootScope',
  '$ajax',
  'ENV',
  function ($rootScope, $ajax, config) {
    return {
      base_url: config.basepath,
      createAnswer: function (uid, qId, description) {
        var _self = this;
        var promise = $ajax({
          method: 'POST',
          url: _self.base_url + '/useranswers/users/' + uid + '/questions/' + qId + '/answers',
          //Get the questionId and plug it in the URL
          data: description
        });
        return promise;
      },
      updateAnswer: function (qId, aId, description) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/questions/' + qId + '/answers/' + aId,
          //Get the answerId and plug it in the URL
          data: description
        });
        return promise;
      },
      deleteAnswer: function (qId, aId) {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/questions/' + qId + '/answers/' + aId
        });
        return promise;
      },
      getAllAnswers: function (qId) {
        var _self = this;
        var answers = $ajax({
          method: 'GET',
          url: _self.base_url + '/questions/' + qId + '/answers'
        });
        return answers;
      },
      getAnswer: function (qId, aId) {
        var _self = this;
        var answer = $ajax({
          method: 'GET',
          url: _self.base_url + '/questions/' + qId + '/answers/' + aId
        });
        return answer;
      },
      /* It is assumed that the current session of User is On,
    and hence he/she can like or dislike the answer */
      likeAnswer: function (qId, aId) {
        var _self = this;
        var like = $ajax({
          method: 'PUT',
          url: _self.base_url + '/questions/' + qId + '/answers/' + aId + '/like'
        });
        return like;
      },
      dislikeAnswer: function (qId, aId) {
        var _self = this;
        var dislike = $ajax({
          method: 'PUT',
          url: _self.base_url + '/questions/' + qId + '/answers/' + aId + '/dislike'
        });
        return dislike;
      }
    };
  }
]);
