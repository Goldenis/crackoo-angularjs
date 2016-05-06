'use strict';

describe('Service: GoalService', function () {

  // load the service's module
  beforeEach(module('crackooApp'));

  // instantiate service
  var GoalService;
  beforeEach(inject(function(_GoalService_) {
    GoalService = _GoalService_;
  }));

  it('should do something', function () {
    expect(!!GoalService).toBe(true);
  });

});
