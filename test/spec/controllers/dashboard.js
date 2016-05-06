'use strict';

angular.module('authMock', [])
  .provider('authService', function() {
     var auth = {
      authResponse : {
        "userID" : "heyrizwan@gmail.com"
      },
      session:
      {
        "userid": "heyrizwan@gmail.com",
          "status" : "connected"
      }
    };
    this.$get = function() {
      return  {
        auth : auth

        //getUser: function() {
        //  return this.userLoggedIn;
        //}
      };
    };
    var _self = this;
    //_self.session.userid = "heyrizwan@gmail.com";
    //_self.session.status = "connected";
    //_self.deferred.resolve(session);
    //return _self;
  });

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('crackooApp'));
  beforeEach(module('authMock'));

  var DashboardCtrl,
    scope,
    auth,
    session,
    authService,
    UserService;

  beforeEach(inject(function(_authService_) {
    authService = _authService_;
    authService.deferred.resolve();
  }));

  beforeEach(inject(function(_authentication_) {
    authService.deferred.resolve();
    auth = _authentication_;
  }));

  beforeEach(inject(function(_UserService_) {
    UserService = _UserService_;
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {

    authService.deferred.resolve();
    scope = $rootScope.$new();

    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope,
      UserService : UserService,
      auth : authService.auth
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.title).toBe('Dashboard');
  });
});
