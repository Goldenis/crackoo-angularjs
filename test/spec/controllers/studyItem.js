'use strict';

describe('Controller: StudyitemCtrl', function () {

  // load the controller's module
  beforeEach(module('crackooApp'));
  beforeEach(module('mockAuthService'));
  beforeEach(module('mockGoalDataService'));



  var StudyitemCtrl,authService,
    scope, GoalDataService;

  beforeEach(inject(function(_GoalDataService_) {
    GoalDataService = _GoalDataService_;
    //GoalDataService.deferred.resolve();
  }));

  beforeEach(inject(function(_authService_) {
    authService = _authService_;
    authService.deferred.resolve();
  }));


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $routeParams, $location, $q) {
    scope = $rootScope.$new();
    StudyitemCtrl = $controller('StudyitemCtrl', {
      $scope: scope,
      $rootScope: $rootScope,
      config: null,
      $routeParams: $routeParams,
      items: null,
      choices: null,
      $location: $location,
      USI: null,
      Comments: null,
      QuestionService: null,
      NoteService: null,
      CitationService: null,
      auth: authService,
      GoalDataService: GoalDataService,
      goalService: null,
      $q: $q,
      Angularytics: null
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.q_main).toBe("views/studyItem/main.html");
  });
});
