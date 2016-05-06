'use strict';
angular.module('crackooApp').controller('ProfileCtrl', [
  '$scope',
  '$routeParams',
  'authService',
  'UserService',
  function ($scope, $routeParams, authService, UserService) {
    $scope.id = $routeParams.id;
    $scope.title = 'Profile';
    $scope.profile_top = 'views/profile/profile_top.html';
    $scope.my_friends_activity = 'views/friends_activity.html';
    $scope.study_plans = 'views/study_plans.html';
    $scope.qs_asked = 'views/profile/question_iasked.html';
    $scope.profile_tabs = 'views/profile/profile_tabs.html';
    /** Set the user first name on the green bar**/
    $scope.$watch(function () {
      return authService.session;
    }, function (data) {
      var fbuserinfo = data.fbuserinfo;
      $scope.full_name = fbuserinfo.first_name + ' ' + fbuserinfo.last_name;
      $scope.profile_link = fbuserinfo.link;
      var location = fbuserinfo.location;
      if ((typeof location !== 'undefined')) {
        $scope.location = location.name;
      }
      if (fbuserinfo.education !== null) {
        var school = fbuserinfo.education[fbuserinfo.education.length - 1];
        if ((typeof school !== 'undefined')) {
          $scope.education = fbuserinfo.education.pop().school.name;
        }
      }
    }, true);
    /* Get the profile image*/
    //$scope.$watch( function () {
    var imgUrl = $scope.imgUrl = UserService.getProfilePicture($scope.userid);
    imgUrl.then(function (res) {
      $scope.imgUrl = res;
    });
    $scope.qs = [
      {
        'statement': 'How do you convert a line to a slope?',
        'num_ans': '3'
      },
      {
        'statement': 'Do Quadrilaterals alway have four sides?',
        'num_ans': '12'
      },
      {
        'statement': 'What does "complimentary angle" mean?',
        'num_ans': '10'
      }
    ];
    $scope.user = {
      'name': 'Rizwan',
      'profile_url': '#',
      'logout_url': '#',
      'profile': {
        'img': {
          src: 'profile_noimage.png',
          alt: 'Profile Pic'
        },
        'full_name': 'Rizwan',
        'location': 'Pune, MH, India',
        'university': 'Dr. J. J. M. C. O. E.'
      },
      'questions': '15',
      'goals': '13',
      'likes': '52',
      'friends': '200'
    };
    $scope.reports = [
      {
        'img': {
          src: 'icon_small_studyplan.png',
          alt: 'Study Plan'
        },
        'num': '10',
        'description': 'Modules Studied'
      },
      {
        'img': {
          src: 'icon_small_question.png',
          alt: 'Question'
        },
        'num': '25',
        'description': 'Questions Answered'
      },
      {
        'img': {
          src: 'icon_small_flashcards.png',
          alt: 'Flashcards'
        },
        'num': '25',
        'description': 'Modules Studied'
      },
      {
        'img': {
          src: 'icon_small_stopwatch.png',
          alt: 'Stopwatch'
        },
        'num': '30',
        'description': 'Hours Spent Studying'
      }
    ];
    $scope.friends = [
      {
        'profile': {
          'img': { 'src': 'profile_thumb_jdamon.jpg' },
          'name': 'John Damon'
        },
        'activity': [{
            'img': {
              'src': 'icon_small_question.png',
              'alt': 'Question'
            },
            'description': 'Finished 25 questions today'
          }]
      },
      {
        'profile': {
          'img': { 'src': 'profile_thumb_bscriftly.jpg' },
          'name': 'Andrew Scriftly'
        },
        'activity': [{
            'img': {
              'src': 'icon_small_studyplan.png',
              'alt': 'Question'
            },
            'description': 'Started a new module today'
          }]
      },
      {
        'profile': {
          'img': { 'src': 'profile_thumb_jscott.jpg' },
          'name': 'Jenna Scott'
        },
        'activity': [
          {
            'img': {
              'src': 'icon_small_flashcards.png',
              'alt': 'Question'
            },
            'description': 'Studied 15 flashcards today'
          },
          {
            'img': {
              'src': 'icon_small_question.png',
              'alt': 'Question'
            },
            'description': 'Finished 25 questions today'
          }
        ]
      }
    ];
    $scope.goals = [
      {
        'img': { 'src': 'icon_small_studyplan.png' },
        'title': 'Calculus II Practice',
        'start_date': '11/20/2011',
        'complete': '34'
      },
      {
        'img': { 'src': 'icon_small_flashcards.png' },
        'title': 'GMAT Flashcards',
        'start_date': '09/15/2011',
        'complete': '92'
      },
      {
        'img': { 'src': 'icon_small_studyplan.png' },
        'title': 'Japanese Practice',
        'start_date': '11/20/2011',
        'complete': '5'
      }
    ];
    $scope.complete_goals = [
      {
        'img': { 'src': 'icon_small_flashcards.png' },
        'title': 'GRE Flashcards',
        'start_date': '08/20/2011',
        'end_date': '11/01/2011'
      },
      {
        'img': { 'src': 'icon_small_studyplan.png' },
        'title': 'Algebra III Practice',
        'start_date': '08/20/2011',
        'end_date': '11/03/2011'
      }
    ];
  }
]);
