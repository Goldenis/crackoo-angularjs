'use strict';

describe('Controller: ProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('crackooApp'));
  beforeEach(module('mockAuthService'));
  beforeEach(module('mockFBService'));


  var ProfileCtrl,authService,UserService,
    scope;

  beforeEach(inject(function(_UserService_) {
    UserService = _UserService_;
    //UserService.deferred.resolve();
  }));

  beforeEach(inject(function(_Facebook_) {
    authService = _Facebook_;
    //authService.deferred.resolve();
  }));

  beforeEach(inject(function(_authService_) {
    authService = _authService_;
    authService.deferred.resolve();
  }));


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,$routeParams) {
    scope = $rootScope.$new();
    ProfileCtrl = $controller('ProfileCtrl', {
      $scope: scope,
      $routeParams: $routeParams,
      authService: authService,
      UserService: UserService
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.title).toBe('Profile');
  });
});
