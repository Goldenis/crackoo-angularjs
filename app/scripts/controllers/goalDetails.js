'use strict';
angular.module('crackooApp').controller('GoaldetailsCtrl', [
  '$scope',
  'GoalService',
  '$routeParams',
  'authService','$location',
  function ($scope, goals, $routeParams,AuthService,$location) {
    $('#topicslink').addClass('active');
      $scope.title = 'Program List';

    var gid = ($routeParams.id).replace(/-/g, ' ');
    //replace the dashes with space
    gid = gid.replace(/-/g, ' ');
    var goals1 = goals.getGoal(gid);
    goals1.then(function (res) {
      $scope.course = res;
      $scope.chosenTitle = res.name + "- Crackoo";
      //$scope.SEOKeywords = 'Crack GRE wordlist, GRE flashcards, GRE word list, GRE word list, gre practice, GRE Free verbal practice, free test preparation, free testing for learners, GRE flashcards, crack GRE, Test Prep, track GRE progress, Standardized Tests,Test Preparation, Test Prep Courses, GRE, LSAT, MCAT, GMAT, ACT, SAT, AP, Prep Courses, track study progress, track test preparation';
      $scope.SEODescription = res.summary;

      var groups = $scope.groups = goals.getNestedTopicList(gid);
      groups.then(function (res) {
        $scope.groups = res;
      });

    });


    $scope.introBox = 'views/courseIntroBox.html';
    $scope.activeTab = 'allCourses';

    /** Set the user first name on the green bar**/
    $scope.$watch(function () {
      return AuthService.session;
    }, function (data) {
      if (data !== null) {
        $scope.first_name = data.displayName;
        $scope.imgUrl = data.imgUrl;
      }
    }, true);

    $scope.backToAllPrograms = function(){
        if($scope.first_name != undefined && $scope.first_name != null){
            $location.path("/goals");
        }else{
          $location.path("/courses");
        }
    };

    //test accordian
    /*
       $scope.groups = [
       {
       title: "Verbal",
       contents: ["Sentence Correction",'Reading Comprehension','Critical Reasoning']
       },
       {
       title: "Quantitative",
       contents: ['Problem Solving','Data  Sufficiency']
       }
       ];
       */
    //var groups = $scope.groups = goals.getNestedTopicList(gid);
    //groups.then(function (res) {
    //  $scope.groups = res;
    //});
    $scope.topicsCovered = 'topics covered';
    $scope.reviews = [
      {
        id: 1,
        desc: 'I really like that I can study with the Android app even when I lack an Internet connection. This is very handy when I have a few spare minutes. I expect to be well prepared for the PMP exam.',
        author: 'Jonathan, PMP Exam user',
        imgUrl: 'img/misc/avatar.jpg'
      },
      {
        id: 2,
        desc: 'I took the test last week and passed! Some thanks definitely in part to BenchPrep and Cengage for providing some additional study options. I will definitely be back again for my GMAT prep.',
        author: 'Sean, PMP Exam user',
        imgUrl: 'img/misc/avatar.jpg'
      },
      {
        id: 3,
        desc: 'I really like it!! It is easy to read and interesting. I did not think I would like a computer based system but it is wonderful.',
        author: 'Darlene, PMP Exam user',
        imgUrl: 'img/misc/avatar.jpg'
      }
    ];
    $scope.call = function (val, e) {
      $('a.tabmenu').removeClass('active');
      $('#' + val).addClass('active');
      e.preventDefault();
      // Call the scroll function
      $scope.goToByScroll(val);
    };
    $scope.goToByScroll = function (id) {
      // Reove "link" from the ID
      id = id.replace('link', '');
      // Scroll
      $('html,body').animate({ scrollTop: $('#' + id).offset().top }, 'slow');
    };
    $scope.switchTab = function (tab) {
      $scope.activeTab = tab;
    };
  }
]);
