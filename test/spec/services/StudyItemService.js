'use strict';

describe('Service: StudyItemService', function () {

  // load the service's module
  beforeEach(module('crackooApp'));

  // instantiate service
  var StudyItemService;
  beforeEach(inject(function(_StudyItemService_) {
    StudyItemService = _StudyItemService_;
  }));

  it('should do something', function () {
    expect(!!StudyItemService).toBe(true);
  });

});
