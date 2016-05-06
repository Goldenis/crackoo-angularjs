'use strict';
angular.module('crackooApp').directive('showonhoverparent', [
  '$rootScope',
  function () {
    return {
      link: function (scope, element) {
        element.parent().bind('mouseenter', function () {
          //	if(!scope.$parent.ansSubmitted){
          element.show();  //	}
        });
        element.parent().bind('mouseleave', function () {
          element.hide();
        });
      }
    };
  }
]);
