'use strict';

describe('Service: TagService', function () {

  // load the service's module
  beforeEach(module('crackooApp'));

  // instantiate service
  var TagService;
  beforeEach(inject(function(_TagService_) {
    TagService = _TagService_;
  }));

  it('should do something', function () {
    expect(!!TagService).toBe(true);
  });

});
