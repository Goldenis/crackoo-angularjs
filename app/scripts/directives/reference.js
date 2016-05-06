'use strict';
angular.module('crackooApp').directive('reference', [
  'UserService',
  'CitationService',
  function (UserService, CitationService) {
    return {
      templateUrl: 'views/reference/reference.html',
      restrict: 'A',
      scope: {
        uid: '@',
        sid: '@',
        site: '@',
        name: '@',
        desc: '@',
        id: '@',
        del: '&',
        userid: '@',
        creationTime: '@',
        autherName: '@',
        imgUrl: '@'
      },
      link: function postLink(scope, element, attrs) {
        console.log('site =', scope.site);
        scope.isEditVisible = false;
        scope.tempName = null;
        scope.tempSite = null;
        scope.tempDesc = null;
        attrs.$observe('reference', function () {
          if (scope.uid === scope.userid) {
            scope.referenceActionsShow = true;
          } else {
            scope.referenceActionsShow = false;
          }
        });
        /* scope.edit = function() {
                    scope.isEditVisible = true;
                    scope.tempName = scope.name;
                    scope.tempSite = scope.site;
                    scope.tempDesc = scope.desc;
                };*/
        scope.save = function () {
          scope.isEditVisible = false;
          scope.name = scope.tempName;
          scope.site = scope.tempSite;
          scope.desc = scope.tempDesc;
          CitationService.updateCitation(scope.userid, scope.id, scope.site);
        };
        scope.cancel = function () {
          scope.isEditVisible = false;
          scope.tempName = null;
          scope.tempSite = null;
          scope.tempDesc = null;
        };
        scope.delete = function (id) {
          console.log('click successful: ' + id);
          scope.del({ 'id': id });
        };
        /* Edit my comment*/
        scope.edit = function () {
          if (scope.uid === scope.userid) {
            scope.isEditVisible = true;
            scope.tempName = scope.name;
            scope.tempSite = scope.site;
            scope.tempDesc = scope.desc;
            scope.tempDescription = scope.description;
          }
        };  //var imgUrl = scope.imgUrl = UserService.getProfilePicture(scope.$parent.$parent.$parent.fbid);
            //imgUrl.then(function(res){
            //    scope.imgUrl = res;
            //});
      }
    };
  }
]);  /*

//Original code. Needs further review before we can delete this.
angular.module('crackooApp')
  .directive('reference', [function() {
	return {
		templateUrl : 'views/reference/reference.html',
		restrict : 'A',
    scope : {
      content : '@',
      id : '@',
      del: '&'
    },
    link: function postLink(scope, element, attrs) {
      scope.isEditVisible = false;
      scope.tempContent = null;
      scope.edit = function() {
        scope.isEditVisible = true;
        scope.tempContent = scope.content;
      };
      scope.save = function() {
        scope.isEditVisible = false;
        scope.content = scope.tempContent;
      };
      scope.cancel = function() {
        scope.isEditVisible = false;
        scope.tempContent = null;
      };
      scope.delete = function(id) {
        console.log('click successful: '+ id);
        scope.del({'id':id});
      };
    }
	};
} ]);


*/