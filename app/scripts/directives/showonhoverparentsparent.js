//designed for hover on parent's parent
'use strict';
angular.module('crackooApp').directive('showonhoverparentsparent', [
  '$rootScope',
  function () {
    return {
      link: function (scope, element) {
        element.parent().parent().bind('mouseenter', function () {
          // The directive is now tied to summary screen. The finish button should not show up for summary screen
          if (!scope.$parent.isSummary) {
            element.show();
          }  //	}
        });
        element.parent().parent().bind('mouseleave', function () {
          element.hide();
        });
      }
    };
  }
]);
