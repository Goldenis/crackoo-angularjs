'use strict';
angular.module('crackooApp').directive('flashCard', [function () {
    return {
      templateUrl: 'views/flashcard/flashcard.html',
      restrict: 'A',
      scope: {
        content: '=',
        id: '@',
        del: '&'
      },
      link: function postLink(scope) {
        scope.modal = 'views/flashcard/flashcard-modal.html';
        scope.isEditVisible = false;
        scope.isFrontVisible = true;
        scope.tempContent = {};
        scope.tempContent.title = null;
        scope.tempContent.front = null;
        scope.tempContent.back = null;
        scope.open = function () {
          $('#' + scope.id).modal();
        };
        scope.flip = function () {
          scope.isFrontVisible = scope.isFrontVisible ? false : true;
        };
        scope.edit = function () {
          scope.isEditVisible = true;
          scope.tempContent.title = scope.content.title;
          scope.tempContent.front = scope.content.front;
          scope.tempContent.back = scope.content.back;
        };
        scope.delete = function (id) {
          scope.del({ 'id': id });
        };
        scope.save = function () {
          scope.isEditVisible = false;
          scope.isFrontVisible = true;
          scope.content = scope.tempContent;
          scope.tempContent = {};
          scope.tempContent.title = null;
          scope.tempContent.front = null;
          scope.tempContent.back = null;  //save to server
        };
        scope.cancel = function () {
          scope.isEditVisible = false;
          scope.tempContent = {};
          scope.tempContent.title = null;
          scope.tempContent.front = null;
          scope.tempContent.back = null;
          scope.isFrontVisible = true;
        };
      }
    };
  }]);  /*

original code

'use strict';

angular.module('crackooApp')
    .directive('flashCard', [function () {
        return {
            templateUrl: 'views/flashcard/flashcard.html',
            restrict: 'A',
            scope: {
                content : '=',
                id : '@',
                del : '&'
            },
            link: function postLink(scope, element, attrs) {
                scope.modal = "views/flashcard/flashcard-modal.html";
                scope.isEditVisible = false;
                scope.isFrontVisible = true;
                scope.tempContent = {};
                scope.tempContent.title = null;
                scope.tempContent.front = null;
                scope.tempContent.back = null;
                scope.open = function() {
                    $('#'+scope.id).modal();
                };
                scope.flip = function () {
                    scope.isFrontVisible = (scope.isFrontVisible) ? false : true;
                };
                scope.edit = function () {
                    scope.isEditVisible = true;
                    scope.tempContent.title = scope.content.title;
                    scope.tempContent.front = scope.content.front;
                    scope.tempContent.back = scope.content.back;
                };
                scope.delete = function(id) {
                    scope.del({'id':id});
                };
                scope.save = function () {
                    scope.isEditVisible = false;
                    scope.isFrontVisible = true;
                    scope.content = scope.tempContent;
                    scope.tempContent = {};
                    scope.tempContent.title = null;
                    scope.tempContent.front = null;
                    scope.tempContent.back = null;
                    //save to server
                };
                scope.cancel = function () {
                    scope.isEditVisible = false;
                    scope.tempContent = {};
                    scope.tempContent.title = null;
                    scope.tempContent.front = null;
                    scope.tempContent.back = null;
                    scope.isFrontVisible = true;
                };
            }
        };
    }]);
*/
        /*

//Commenting out original code. Current code needs further review before we can delete this.
 'use strict';

 angular.module('crackooApp')
 .directive('flashCard', [function () {
 return {
 templateUrl: 'views/flashcard/flashcard.html',
 restrict: 'A',
 scope: {
 content : '=',
 id : '@',
 del : '&'
 },
 link: function postLink(scope, element, attrs) {
 scope.modal = "views/flashcard/flashcard-modal.html";
 scope.isEditVisible = false;
 scope.isFrontVisible = true;
 scope.tempContent = {};
 scope.tempContent.title = null;
 scope.tempContent.front = null;
 scope.tempContent.back = null;
 scope.open = function() {
 $('#'+scope.id).modal();
 };
 scope.flip = function () {
 scope.isFrontVisible = (scope.isFrontVisible) ? false : true;
 };
 scope.edit = function () {
 scope.isEditVisible = true;
 scope.tempContent.title = scope.content.title;
 scope.tempContent.front = scope.content.front;
 scope.tempContent.back = scope.content.back;
 };
 scope.delete = function(id) {
 scope.del({'id':id});
 };
 scope.save = function () {
 scope.isEditVisible = false;
 scope.isFrontVisible = true;
 scope.content = scope.tempContent;
 scope.tempContent = {};
 scope.tempContent.title = null;
 scope.tempContent.front = null;
 scope.tempContent.back = null;
 //save to server
 };
 scope.cancel = function () {
 scope.isEditVisible = false;
 scope.tempContent = {};
 scope.tempContent.title = null;
 scope.tempContent.front = null;
 scope.tempContent.back = null;
 scope.isFrontVisible = true;
 };
 }
 };
 }]);



 */
