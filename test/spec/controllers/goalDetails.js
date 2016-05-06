'use strict';

describe('Controller: GoaldetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('crackooApp'));
  //beforeEach(module('mockAuthService'));

  var GoaldetailsCtrl, scope, GoalService;
  var authService;

  //beforeEach(inject(function(_authService_) {
  //  authService = _authService_;
  //  authService.deferred.resolve();
  //}));

  beforeEach(inject(function(_GoalService_) {
    GoalService = _GoalService_;
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $routeParams) {
    scope = $rootScope.$new();
    GoaldetailsCtrl = $controller('GoaldetailsCtrl', {
      $scope: scope,
      GoalService: GoalService,
      $routeParams: $routeParams
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.activeTab).toBe("allCourses");
  });
});
