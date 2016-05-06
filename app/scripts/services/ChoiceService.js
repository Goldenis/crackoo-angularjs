'use strict';
angular.module('crackooApp').factory('ChoiceService', [
  '$rootScope',
  '$ajax',
  'ENV',
  function ($rootScope, $ajax, config) {
    return {
      base_url: config.basepath,
      /* Creates Choice for given Study Item */
      createStudyItemChoice: function (studyItemId, choiceView) {
        var _self = this;
        var promise = $ajax({
          method: 'POST',
          url: _self.base_url + '/studyitems/' + studyItemId + '/choices',
          data: choiceView
        });
        return promise;
      },
      /* Updates given choice for Study Item */
      updateStudyItemChoice: function (studyItemId, choiceId, choiceView) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/studyitems/' + studyItemId + '/choices/' + choiceId,
          data: choiceView
        });
        return promise;
      },
      /* Deletes the given choice for Study Item */
      deleteStudyItemChoice: function (studyItemId, choiceId) {
        var _self = this;
        var promise = $ajax({
          method: 'DELETE',
          url: _self.base_url + '/studyitems/' + studyItemId + '/choices/' + choiceId
        });
        return promise;
      },
      /* Gets all the Choices in the Study Item */
      getStudyItemChoices: function (studyItemId) {
        var _self = this;
        var choices = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + studyItemId + '/choices'
        });
        return choices;
      },
      /* Gets a particular choice for given Study Item */
      getChoice: function (studyItemId, choiceId) {
        var _self = this;
        var choice = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + studyItemId + '/choices/' + choiceId
        });
        return choice;
      },
      /* Gets the User choice for given Study Item */
      getUserChoice: function (studyItemId, choiceId) {
        var _self = this;
        var userChoice = $ajax({
          method: 'GET',
          url: _self.base_url + '/studyitems/' + studyItemId + '/choices/' + choiceId + '/userchoiceview'
        });
        return userChoice;
      },
      /* Updates the User Choice for given Study Item */
      updateUserChoice: function (uId, choiceId, userChoice) {
        var _self = this;
        var promise = $ajax({
          method: 'PUT',
          url: _self.base_url + '/userchoices/users/' + uId + '/choices/' + choiceId,
          data: userChoice
        });
        return promise;
      }
    };
  }
]);
