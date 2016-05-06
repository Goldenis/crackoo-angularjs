'use strict';

describe('Controller: ReportCtrl', function () {

  // load the controller's module
  beforeEach(module('crackooApp'));
  beforeEach(module('mockAuthService'));


  var ReportCtrl,authService,
    scope;

  beforeEach(inject(function(_authService_) {
    authService = _authService_;
    authService.deferred.resolve();
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $routeParams, $rootScope, $location) {
    scope = $rootScope.$new();
    ReportCtrl = $controller('ReportCtrl', {
      config: null,
      auth: authService,
      $routeParams: $routeParams,
      Reports: null,
      Charts: null,
      $scope: scope,
      $rootScope: $rootScope,
      UserStudyItemService: null,
      $location: $location,
      GoalDataService: null,
      goalService: null

    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.uid).toBe("heyrizwan@gmail.com");
  });
});
