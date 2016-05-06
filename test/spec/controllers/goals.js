'use strict';

describe('Controller: GoalsCtrl', function () {

  // load the controller's module
  beforeEach(module('crackooApp'));
  beforeEach(module('mockAuthService'));
  beforeEach(module('appconfig'));

  var GoalsCtrl,userGoalService,authService,goalService,items,
    scope;

  beforeEach(inject(function(_authService_) {
    authService = _authService_;
    authService.deferred.resolve();
  }));

  beforeEach(inject(function(_GoalService_) {
    goalService = _GoalService_;
  }));

  beforeEach(inject(function(_GoalService_) {
    goalService = _GoalService_;
  }));

  beforeEach(inject(function(_UserGoalService_) {
    userGoalService = _UserGoalService_;
  }));

  beforeEach(inject(function(_StudyItemService_) {
    items = _StudyItemService_;
  }));



  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location, $routeParams) {
    scope = $rootScope.$new();
    GoalsCtrl = $controller('GoalsCtrl', {
      $scope: scope,
      $rootScope : $rootScope,
      goalService : goalService,
      userGoalService : userGoalService,
      config : null,
      items : items,
      $location : $location,
      auth : authService,
      $routeParams : $routeParams
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.activeTab).toBe("allCourses");
  });
});
