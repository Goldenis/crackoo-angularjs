'use strict';
angular.module('crackooApp').directive('notesList', [
  'NoteService',
  'UserService',
  'authService',
  function (NotesService, UserService, AuthService) {
    return {
      templateUrl: 'views/notes/notesList.html',
      restrict: 'A',
      scope: {
        notes: '=',
        myNs: '=',
        sid: '@',
        gid: '@gid',
        uid: '@uid',
        id: '@id'  //        isShowMyNotes: '@',
               //        isShowNotes: '@'
      },
      link: function postLink(scope) {
        scope.notesData = null;
        scope.qId = 1;
        scope.notesList = scope.notes;
        console.log(scope.notesList);
        scope.showMyNote = false;
        scope.toggleMyNotes = function () {
          scope.showMyNote = !scope.showMyNote;
          if (scope.showMyNote) {
            scope.notesList = scope.myNs;
          } else {
            scope.notesList = scope.notes;
          }
        };
        //watch for changes in the value of my Notes
        scope.$parent.$watch('myNs', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.myNs = value;
          if (scope.showMyNote) {
            scope.notesList = scope.myNs;
          }  //              scope.myNs= value;
             //              if ((value.length > 0)){
             //                  scope.isShowMyNotes = true ;
             //              }
             //              console.log("my notes are");
             //              console.log(value);
             //alert(scope.isShowMyComments);
        });
        //watch for changes in the value of Notes
        scope.$parent.$watch('notes', function (value) {
          if (typeof value === 'undefined') {
            return;
          }
          scope.notes = value;
          if (!scope.showMyNote) {
            scope.notesList = scope.notes;
          }  //              scope.notes = value;
             //              if ((scope.notes.length > 0)){
             //                  //alert("lenght is greater than zero");
             //                  scope.isShowNotes= true ;
             //              }
             //alert(scope.isShowComments);
        });
        /* scope.showMyNotes = function() {
              //alert(scope.isShowMyNotes);
              //alert(scope.myNs.length);
              return scope.myNs.length > 0 ;
          };*/
        /*        scope.showNotes = function() {
              //alert(scope.isShowNotes);
              return scope.isShowNotes;
          };
*/
        scope.addNotes = function (uid, sid) {
          var data = scope.notesData;
          scope.notesData = null;
          //Create the notes and get the notesID
          var createdNotes = NotesService.createNote(uid, sid, data);
          var notesID = null;
          createdNotes.then(function (resp) {
            console.log(resp);
            var location = resp.headers('location');
            notesID = location.substring(location.lastIndexOf('notes') + 9);
            var newNotes = {
              userid: uid,
              description: data,
              imgUrl: AuthService.session.imgUrl,
              username: AuthService.session.displayName,
              notesID: notesID,
              creationDate: Date.now()
            };
            scope.qId += 1;
            console.log(newNotes);
            console.log(scope.myNs);
            scope.myNs.unshift(newNotes);
            scope.notes.unshift(newNotes);
            console.log(scope.notes);
          });
        };
        //scope.getImgUrl = function(userid) {
        //    alert(userid);
        //    return User.getProfilePicture(userid);
        //};
        scope.delete = function (id) {
          NotesService.deleteNote(scope.uid, id);
          for (var i = 0; i < scope.myNs.length; i += 1) {
            if (scope.myNs[i].notesID === id) {
              scope.myNs.splice(i, 1);
            }
          }
          for (var j = 0; i < scope.notes.length; j += 1) {
            if (scope.notes[j].notesID === id) {
              scope.notes.splice(j, 1);
            }
          }
        };
      }
    };
  }
]);  /*
scope.addNotes = function(uid, sid) {
    var data = scope.notesData;
    scope.notesData = null;
    var newNotes = {
        description : data
    };
    newNotes.id = Notes.createNotes(uid, sid, data);
    myNotes.unshift(newNotes);

    */
