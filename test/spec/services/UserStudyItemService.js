'use strict';

describe('Service: UserStudyItemService', function () {

  // load the service's module
  beforeEach(module('crackooApp'));

  // instantiate service
  var UserStudyItemService;
  beforeEach(inject(function(_UserStudyItemService_) {
    UserStudyItemService = _UserStudyItemService_;
  }));

  it('should do something', function () {
    expect(!!UserStudyItemService).toBe(true);
  });

});
