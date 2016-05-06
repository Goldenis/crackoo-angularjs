'use strict';

describe('Service: auth', function () {

  // load the service's module
  beforeEach(module('crackooApp'));

  // instantiate service
  var authService;
  beforeEach(inject(function(_authService_) {
    authService = _authService_;
  }));

  it('should do something', function () {
    expect(!!authService).toBe(true);
  });

});
