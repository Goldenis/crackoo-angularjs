'use strict';
angular.module('crackooApp').directive('referenceList', [
  'CitationService',
  'authService',
  function (CitationService, AuthService) {
    return {
      templateUrl: 'views/reference/referenceList.html',
      restrict: 'A',
      scope: {
        references: '=',
        myReferences: '=',
        sid: '@',
        gid: '@gid',
        uid: '@uid',
        id: '@id'
      },
      link: function postLink(scope) {
        //                scope.references = [{description:'description for google1',name:'Google',site:'www.google.com', id:'1'},{description:'description for linkedin',name:'Linkedin',site:'www.linkedin.com', id:'2'}];
        scope.dataName = null;
        scope.dataSite = null;
        scope.dataDesc = null;
        scope.referencesList = scope.references;
        console.log(scope.notesList);
        scope.showMyReference = false;
        /*scope.references = [];
                 scope.add = function() {
                 //scope.references.push(scope.project);
                 scope.references.unshift(scope.project);
                 scope.project = null;
                 scope.isAddVisible = false;
                 //console.log(scope.projectList);
                 }*/
        scope.toggleMyReferences = function () {
          scope.showMyReference = !scope.showMyReference;
          if (scope.showMyReference) {
            scope.referencesList = scope.myReferences;
          } else {
            scope.referencesList = scope.references;
          }
        };
        //watch for changes in the value of my Notes
        scope.$parent.$watch('myReferences', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.myReferences = value;
          if (scope.showMyReference) {
            scope.referencesList = scope.myReferences;
          }  //                    if ((scope.myReferences.length > 0)){
             //                        scope.myReferences = value;
             //                        //scope.isShowMyComments = true ;
             //                    }
             //alert(scope.isShowMyComments);
        });
        //watch for changes in the value of Notes
        scope.$parent.$watch('references', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.references = value;
          if (!scope.showMyReference) {
            scope.referencesList = scope.references;
          }
        });
        scope.add = function (uid, sid) {
          var data = scope.dataSite;
          scope.dataSite = null;
          var createdCitation = CitationService.createCitation(uid, sid, data);
          var citationID = null;
          createdCitation.then(function (resp) {
            var location = resp.headers('location');
            citationID = location.substring(location.lastIndexOf('citations') + 10);
            //var r = {citationID: '', name : scope.dataName, desc : data, site : data};
            var r = {
              userid: uid,
              citationID: citationID,
              description: data,
              creationDate: Date.now(),
              imgUrl: AuthService.session.imgUrl,
              username: AuthService.session.displayName
            };
            console.log(r);
            scope.myReferences.unshift(r);
            scope.references.unshift(r);
            scope.data = null;
          });
        };
        scope.delete = function (id) {
          CitationService.deleteCitation(scope.uid, id);
          for (var i = 0; i < scope.myReferences.length; i += 1) {
            if (scope.myReferences[i].citationID === id) {
              scope.myReferences.splice(i, 1);
            }
          }
          for (var j = 0; j < scope.references.length; j += 1) {
            if (scope.references[j].citationID === id) {
              scope.references.splice(j, 1);
            }
          }  //send delete request to server
        };
        //                scope.showMyReferences = function() {
        //                    return scope.myReferences.length > 0;
        //                };
        scope.isListVisible = false;
        scope.isAddVisible = false;
        scope.toggleAdd = function () {
          scope.isAddVisible = scope.isAddVisible ? false : true;
        };
        scope.toggleList = function () {
          scope.isListVisible = scope.isListVisible ? false : true;
        };
        scope.toggleList();
      }
    };
  }
]);  /*

//Original reference code. Need it for reference for the time being.
angular.module('crackooApp')
  .directive('referenceList', [function () {
    return {
      templateUrl: 'views/reference/referenceList.html',
      restrict: 'A',
      scope : true,
      link: function postLink(scope, element, attrs) {
        scope.references = [{data:'www.google.com', id:'1'},{data:'www.quora.com', id:'2'}];
        scope.data = null;
        scope.add = function() {
           var r = {uid: '', data : scope.data};
           scope.references.unshift(r);
           scope.data=null;
        };
        scope.delete = function(id) {
          console.log('request reaching this place ' + id);
          for(var i = 0; i < scope.references.length; i++ ) {
            if(scope.references[i].id === id) {
              scope.references.splice(i,1);
            }
          }
          //send delete request to server
        };
        scope.isListVisible = false;
        scope.isAddVisible = false;
        scope.toggleAdd = function () {
          scope.isAddVisible = (scope.isAddVisible) ? false : true;
        };
        scope.toggleList = function() {
          scope.isListVisible = (scope.isListVisible) ? false : true;
        }
          scope.toggleList();
      }
    };
  }]);


    */
