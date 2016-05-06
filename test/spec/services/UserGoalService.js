'use strict';

describe('Service: UserGoalService', function () {

  // load the service's module
  beforeEach(module('crackooApp'));

  // instantiate service
  var UserGoalService;
  beforeEach(inject(function(_UserGoalService_) {
    UserGoalService = _UserGoalService_;
  }));

  it('should do something', function () {
    expect(!!UserGoalService).toBe(true);
  });

});
