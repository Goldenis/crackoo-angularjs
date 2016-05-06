'use strict';
angular.module('crackooApp').controller('StudyitemCtrl', [
  '$scope',
  '$rootScope',
  'app.config',
  '$routeParams',
  'StudyItemService',
  'ChoiceService',
  '$location',
  'UserStudyItemService',
  'CommentService',
  'QuestionService',
  'NoteService',
  'CitationService',
  'auth',
  'GoalDataService',
  'GoalService',
  '$q',
  'Angularytics', '$timeout',
  function ($scope, $rootScope, config, $routeParams, items, choices, $location, USI, Comments, QuestionService, NoteService, CitationService, auth, GoalDataService, goalService, $q, Angularytics, $timeout) {
    $scope.title = 'Study Play : GRE Prep';
    var id = $scope.id = $routeParams.id;
    var gid = $scope.gid = ($routeParams.gid).replace(/-/g, ' ');
    //gid = gid.replace(/-/g, ' ');
    /*manage uid for the non loggedin user*/
    var uid;
    if(auth.getUser() && auth.getUser().email){
      uid = $scope.uid = auth.getUser().email;
    }

    $scope.slider = {
      value : 0,
      'options': {
        min: 0,
        max: 0,
        step: 1 ,
        range: 'min',
        start: function (event, ui) {
          console.log('Event: Slider start - set with slider options', event);
        },
        stop: function (event, ui) {
          console.log('Event: Slider stop - set with slider options ', event);
          if($scope.its && $scope.its.length > 0 ){
            if($scope.its[$scope.slider.value].studyItemID != id){
              $scope.move($scope.its[$scope.slider.value]);
            }
          }
        }
      }
    };

    //var fbid = $scope.fbid = auth.getUser().fbid;
    //$scope.item;
    $scope.time = 0;
    $scope.explanationbox = { show: true };
    /** ugly hack. we need a copy of the explnation box flag to restore the orginal value after we switch flags. Rethink this design when refactoring this code**/
    $scope.copyExplanationBox = { show: true };
    $rootScope.isGoalPage = false;
    var studyitemtype;
   ////////////// var res = GoalDataService.getStudyItems(gid);

    //var studyitem;
    var studyItemMap = GoalDataService.getStudyItemMap($scope.gid);
    studyItemMap.then(function (res){

      var goalStudyItems = GoalDataService.getStudyItems();
      goalStudyItems.then(function (res){
        $scope.its = res;
        console.log(res);
        $scope.slider.options.min = 0;
        $scope.slider.options.max = res.length - 1;
      });
      $scope.item = res.get(id);
      //$rootScope.cgid = $scope.item.goalID;
      $rootScope.cgname = $scope.item.goalName;
      $scope.number = $scope.item.number + 1;
      //$scope.item = res[i];
      $scope.title = $scope.item.caption;
      $scope.isDifficultStudyItem = $scope.item.difficulty === 'D';
      $scope.isEasyStudyItem = $scope.item.difficulty === 'E';
      //////////$scope.percent = Math.floor((i + 1) * 100 / res.length);

      $scope.nextItem = $scope.item.nextItem;
      console.log($scope.nextItem);
      $scope.prevItem = $scope.item.prevItem;
      if ($scope.item.studyItemType === 'P' || $scope.item.studyItemType === 'F' || $scope.item.studyItemType === 'E') {
        studyitemtype = 'Question';
         var answers = choices.getStudyItemChoices($scope.item.studyItemID);
         answers.then(function(res){
         $scope.answers = res;
         console.log("choices are" + res);
         $scope.studyStartTime = $scope.time;
         });
      } else if ($scope.item.studyItemType === 'S') {
        studyitemtype = 'Study';
      } else if ($scope.item.studyItemType === 'F') {
        studyitemtype = 'Flashcard';
      }
      $scope.headerMessage = studyitemtype + ' ' + $scope.number + ' of ' + res.size;

    });


    //        result.then(function(response) {
    //               res = response;
    //            $dd.resolve(res);
    //
    //            });
    //        if (res == null || typeof res === 'undefined'){ //the page was  possibly refreshed and the study items cache has been reset
    //            var $d = $q.defer();
    //            var its = items.getStudyItems(gid);
    //            its.then(function(response) {
    //
    //                $d.resolve({
    //                    getUser : function() {
    //                        return auth.session.fbuserinfo;
    //                    }
    //                    //session : auth.session,
    //                    //status: auth.session.status,
    //                    //authResponse: auth.session.auth_response
    //                });
    //                res = response;
    //                GoalDataService.setStudyItems(response);
    //                $location.path('goals/'+gid+'/items/'+response[0].studyItemID);
    //            });
    //        }


    //if (res === null || typeof res === 'undefined') {
    //}
    //res.then(function (response) {
    //  res = response;
    //  //console.log("study items are " +JSON.stringify(response));
    //  var num = 1;
    //  var answers = choices.getStudyItemChoices(id);
    //  answers.then(function (res) {
    //    $scope.answers = res;
    //    console.log('choices are: ', res);
    //    $scope.studyStartTime = $scope.time;
    //  });
    //  $scope.its = res;
    //  $scope.slider.options.min = 0;
    //  $scope.slider.options.max = res.length - 1;
    //
    //
    //  /**The next item is re-calculated every time and ths is very inefficient**/
    //  for (var i = 0; i < res.length; i += 1) {
    //    if (res[i].studyItemID === id) {
    //      $rootScope.cgid = res[i].goalID;
    //      $rootScope.cgname = res[i].goalName;
    //      $scope.number = num;
    //      $scope.item = res[i];
    //      $scope.title = res[i].caption;
    //      $scope.isDifficultStudyItem = res[i].difficulty === 'D';
    //      $scope.isEasyStudyItem = res[i].difficulty === 'E';
    //      $scope.percent = Math.floor((i + 1) * 100 / res.length);
    //      if (i > 0) {
    //        $scope.prevItem = res[i - 1].studyItemID;
    //      }
    //      if (i + 1 < res.length) {
    //        $scope.nextItem = res[i + 1].studyItemID;
    //      }
    //      if (i === 0) {
    //        $scope.prevItem = 'start';
    //      }
    //      if (i === res.length - 1) {
    //        $scope.nextItem = 'end';
    //      }
    //      break;
    //    }
    //    num += 1;
    //  }

            //});

    //fetch study item result
    var usir = $scope.usir = USI.getUserStudyItemResult(uid, id);
    usir.then(function (res) {
      console.log("user study item result is "+ JSON.stringify(res));
      $scope.attempts = res.ac;
      $scope.correct = res.cc;
      $scope.incorrect = res.ic;
      $scope.cp = res.cp;
      $scope.icp = res.icp;
      $scope.acp = res.acp;
      $scope.aicp = 100 - res.acp;
      $scope.isBeginner = res.mastery === 'N';
      $scope.isMastered = res.cp === 'P';
      $scope.isIntermediate = res.mastery === 'A';  //console.log("user study item result", res);
    });
    //fetch community study item result
    var usicr = $scope.usicr = USI.getCommunityStudyItemResult(id);
    usicr.then(function (res) {
      console.log("community study item result is "+ JSON.stringify(res));
      $scope.comunityAttempts = res.ac;
      $scope.communityCorrect = res.cc;
      $scope.communityIncorrect = res.ic;
      $scope.communityCp = res.cp;
      $scope.communityIcp = res.icp;  //$scope.communityAcp = res.acp;
                                      //$scope.communityAicp = 100 - res.acp;
                                      //console.log("community study item result", res);
    });
      var notes = [];
     // var myQs = $scope.myQs = [];
      var usi = $scope.usi = USI.getStudyItem(uid, gid, id);
      usi.then(function (res) {
        $scope.slider.value = $scope.number - 1;
        $scope.confidence = res.confidence;
        $scope.difficulty = res.difficulty;
        $scope.needsReview = res.needsReview;
        $scope.inappropriate = res.inappropriate;
        $scope.interestLevel = res.interestLevel;
        $scope.hide = res.hide;
        $scope.lastStudied = res.lastStudied;
        //if (res.totaltime < 60){
        var dur = moment.duration(res.totaltime * 1000);
        //var hours = dur.hours();
        //var minutes = dur.minutes();
        //var seconds = dur.seconds();
        //if (hours > 0){
        //  if (minutes > 0 || seconds > 0){
        //    if(minutes > 0)
        //  }
        //}
        $scope.hours = dur.hours();
        $scope.minutes = dur.minutes();
        $scope.seconds = dur.seconds();
        $scope.avgStudyTime = dur.hours() + ' Hour' + dur.minutes() + ' Minutes' + dur.seconds() + ' Seconds';  //}
                                                                                                                //  $scope.avgStudyTime = res.totaltime/60;
                                                                                                                //console.log("user study items ", res);
      });
      $scope.q_main = 'views/studyItem/main.html';
      $scope.q_left = 'views/studyItem/left.html';
      $scope.q_right = 'views/studyItem/right.html';
      $scope.isSummary = false;
      $scope.showSummary = function () {
        $scope.isSummary = true;
        $scope.current_view = $scope.q_statsView;
        $scope.showArrowNavigation = false;
        $scope.showFlashCardArrowNavigation = false;
        $scope.explanationbox.show = true;
        $scope.headerMessage = 'Summary';
      };
      $scope.showAttempts = function () {
        return $scope.attempts && !$scope.isSummary;
      };
      $scope.showMastery = function () {
        return !$scope.isSummary;
      };
      $scope.showLastStudied = function () {
        return !$scope.isSummary;
      };

      $scope.updateStatistics = function () {


        ////fetch community study item result
        //var usicr = $scope.usicr = USI.getCommunityStudyItemResult(id);
        //usicr.then(function (res) {
        //  console.log("community study item result is "+ JSON.stringify(res));
        //  $scope.comunityAttempts = res.ac;
        //  $scope.communityCorrect = res.cc;
        //  $scope.communityIncorrect = res.ic;
        //  $scope.communityCp = res.cp;
        //  $scope.communityIcp = res.icp;  //$scope.communityAcp = res.acp;
        //                                  //$scope.communityAicp = 100 - res.acp;
        //                                  //console.log("community study item result", res);
        //});
        //fetch Avg time
        var avgStudyTime = $scope.usicr = USI.getAverageStudyTime(id);
        avgStudyTime.then(function (res) {
          //$scope.averageStudyTime = res;
          var dur = moment.duration(res * 1000);
          $scope.avghours = dur.hours();
          $scope.avgminutes = dur.minutes();
          $scope.avgseconds = dur.seconds();
          //$scope.avgStudyTime = dur.hours() + ' Hour' + dur.minutes() + ' Minutes' + dur.seconds() + ' Seconds';
          console.log('Average study time is', res);
        });

      }
      var goals = goalService.getGoal(gid);
      goals.then(function (res) {
        $scope.course = res;
        $scope.author = res.author;
      });
      //var myComments = $scope.myComments = Comments.getUserComments(uid, $scope.id);
      //myComments.then(function (res) {
      //  $scope.myComments = res;  //console.log("my comments ", res);
      //});
      //var comments = $scope.comments = Comments.getComments(id);
      //comments.then(function (res) {
      //  $scope.comments = res;  //console.log("comments ", res);
      //});
      //var myQuestions = $scope.myQuestions = QuestionService.getUserStudyItemQuestions(uid, $scope.id);
      //myQuestions.then(function (res) {
      //  $scope.myQuestions = res;  //console.log("my questions", res);
      //});
      //var questions = $scope.questions = QuestionService.getStudyItemQuestions(id);
      //questions.then(function (res) {
      //  $scope.questions = res;  //console.log("questions ", res);
      //});
      //var myNs = $scope.myNs = NoteService.getUserNotes(uid, $scope.id);
      ////getStudyItemNotes
      //myNs.then(function (res) {
      //  $scope.myNs = res;  //console.log("my notes ", res);
      //});
      //notes = $scope.notes = NoteService.getStudyItemNotes(id);
      //notes.then(function (res) {
      //  $scope.notes = res;  //console.log("notes ", res);
      //});
      //        var references = [];
      //var references = $scope.references = CitationService.getCitations(id);
      //references.then(function (res) {
      //  $scope.references = res;
      //  console.log('references', res);
      //});
      //var myReferences = $scope.myReferences = CitationService.getStudyItemUserCitations($scope.uid, $scope.id);
      //myReferences.then(function (res) {
      //  $scope.myReferences = res;  //console.log("my references", res);
      //});
      /** Navigate to next study item**/

      $scope.move = function (sid) {
        console.log('move to '+sid);
        var currentTime = new Date().getTime();
        var totalStudyItemStudyTime = $scope.time;
        var data = {
          lastStudied: currentTime,
          totaltime: totalStudyItemStudyTime
        };
        if (sid === 'start') {
        } else if (sid === 'end') {
          //save the total study time (ths is applicable for either flashcard or study studyitem)
          USI.updateStudyItem($scope.uid, $scope.gid, $scope.id, data);
          //FIXME this should be called only after the previous service has returned
          //$location.path('/report/'+gid+'/status');
          $scope.showSummary();
        } else {
          USI.updateStudyItem($scope.uid, $scope.gid, $scope.id, data);
          $location.path('/goals/' + gid.replace(/\s+/g, '-') + '/items/' + sid.studyItemID);
        }
      };
    //}); //////////////////////////
    $scope.toggleExpand = function () {
      $location.path('/goals/' + gid + '/items/' + id + '/fullscreen');
    };
    $scope.showexplanation = function () {
      return $scope.explanationbox.show;
    };
    /*
       * Handle tab switching
       */
    $scope.showArrowNavigation = true;
    $scope.showFlashCardArrowNavigation = false;
    $scope.q_main = 'views/studyItem/main.html';
    //        $scope.q_right = "views/studyItem/right.html";
    $scope.q_left = 'views/studyItem/left.html';
    $scope.q_header = 'views/studyItem/question-header.html';
    $scope.q_answers = 'views/studyItem/answers.html';
    $scope.q_question = '';
    $scope.q_stats = 'views/studyItem/statistics.html';
    $scope.q_statsView = 'views/studyItem/statisticsView.html';
    $scope.q_notes = 'views/notes/notesView.html';
    $scope.q_questions = 'views/questions/questionsListView.html';
    $scope.q_comments = 'views/comments/commentView.html';
    $scope.q_flash_card = 'views/flashcard/flashcardListView.html';
    $scope.q_reference = 'views/reference/referencesListView.html';
    $scope.current_view = $scope.q_question;
    $scope.updateQuestion = function () {
      var questions = $scope.questions = QuestionService.getStudyItemQuestions(id);
      questions.then(function (res) {
        $scope.questions = res;
      });
      var myQuestions = $scope.myQuestions = QuestionService.getUserStudyItemQuestions(uid, $scope.id);
      myQuestions.then(function (res) {
        $scope.myQuestions = res;  //console.log("my questions", res);
      });
    };
    $scope.updateComments = function () {
      var comments = $scope.comments = Comments.getComments(id);
      comments.then(function (res) {
        $scope.comments = res;
      });
      var myComments = $scope.myComments = Comments.getUserComments(uid, $scope.id);
      myComments.then(function (res) {
        $scope.myComments = res;  //console.log("my comments ", res);
      });
    };
    $scope.updateNotes = function () {
      var myNs = $scope.myNs = NoteService.getUserNotes(uid, $scope.id);
      myNs.then(function (res) {
        $scope.myNs = res;  //console.log("my notes ", res);
      });
      var notes = $scope.notes = NoteService.getStudyItemNotes(id);
      notes.then(function (res) {
        $scope.notes = res;  //console.log("notes ", res);
      });
    };
    $scope.updateReferences = function () {
      var references = $scope.references = CitationService.getCitations(id);
      references.then(function (res) {
        $scope.references = res;
        console.log('references', res);
      });
      var myReferences = $scope.myReferences = CitationService.getStudyItemUserCitations($scope.uid, $scope.id);
      myReferences.then(function (res) {
        $scope.myReferences = res;  //console.log("my references", res);
      });
    };
    $scope.switchQuestion = function (tabName) {
      //console.log(tabName);
      switch (tabName) {
      case 'question-containerlink':
        $scope.showArrowNavigation = true;
        $scope.showFlashCardArrowNavigation = false;
        $scope.explanationbox.show = $scope.copyExplanationBox.show;
        $scope.current_view = $scope.q_question;
        Angularytics.trackEvent('Study Item Click', tabName);
        break;
      case 'statisticslink':
        $scope.updateStatistics();
        $scope.current_view = $scope.q_statsView;
        $scope.showArrowNavigation = false;
        $scope.showFlashCardArrowNavigation = false;
        $scope.explanationbox.show = true;
        Angularytics.trackEvent('Study Item Click', tabName);
        break;
      case 'noteslink':
        $scope.updateNotes();
        $scope.current_view = $scope.q_notes;
        $scope.showArrowNavigation = false;
        $scope.showFlashCardArrowNavigation = false;
        $scope.explanationbox.show = true;
        Angularytics.trackEvent('Study Item Click', tabName);
        break;
      case 'questionslink':
        $scope.updateQuestion();
        $scope.current_view = $scope.q_questions;
        $scope.showArrowNavigation = false;
        $scope.showFlashCardArrowNavigation = false;
        $scope.explanationbox.show = true;
        Angularytics.trackEvent('Study Item Click', tabName);
        break;
      case 'commentslink':
        $scope.updateComments();
        $scope.current_view = $scope.q_comments;
        $scope.showArrowNavigation = false;
        $scope.showFlashCardArrowNavigation = false;
        $scope.explanationbox.show = true;
        Angularytics.trackEvent('Study Item Click', tabName);
        break;
      case 'flashcardslink':
        $scope.current_view = $scope.q_flash_card;
        $scope.showArrowNavigation = false;
        $scope.showFlashCardArrowNavigation = true;
        $scope.explanationbox.show = true;
        Angularytics.trackEvent('Study Item Click', tabName);
        break;
      case 'referenceslink':
        $scope.updateReferences();
        $scope.current_view = $scope.q_reference;
        $scope.showArrowNavigation = false;
        $scope.showFlashCardArrowNavigation = false;
        $scope.explanationbox.show = true;
        Angularytics.trackEvent('Study Item Click', tabName);
        break;
      default:
        $scope.current_view = $scope.q_question;
        $scope.showArrowNavigation = true;
        $scope.showFlashCardArrowNavigation = false;
        break;
      }
    };
    $scope.isTabSelected = function (tabName) {
      switch (tabName) {
      case 'question-containerlink':
        if ($scope.current_view === $scope.q_question) {
          return true;
        }
        return false;
        //break;
      case 'statisticslink':
        if ($scope.current_view === $scope.q_statsView) {
          return true;
        }
        return false;
        //break;
      case 'noteslink':
        if ($scope.current_view === $scope.q_notes) {
          return true;
        }
        return false;
        //break;
      case 'questionslink':
        if ($scope.current_view === $scope.q_questions) {
          return true;
        }
        return false;
        //break;
      case 'commentslink':
        if ($scope.current_view === $scope.q_comments) {
          return true;
        }
        return false;
        //break;
      case 'flashcardslink':
        if ($scope.current_view === $scope.q_flash_card) {
          return true;
        }
        return false;
        //break;
      case 'referenceslink':
        if ($scope.current_view === $scope.q_reference) {
          return true;
        }
        return false;
        //break;
      default:
        if ($scope.current_view === $scope.q_question) {
          return true;
        }
        return false;
        //break;
      }
    };
  }
]);
