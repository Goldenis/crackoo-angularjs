'use strict';
angular.module('crackooApp').directive('note', [function () {
    return {
      template: 'views/notes/note.html',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the notes directive');
      }
    };
  }]);
