'use strict';

describe('Service: ChoiceService', function () {

  // load the service's module
  beforeEach(module('crackooApp'));

  // instantiate service
  var ChoiceService;
  beforeEach(inject(function(_ChoiceService_) {
    ChoiceService = _ChoiceService_;
  }));

  it('should do something', function () {
    expect(!!ChoiceService).toBe(true);
  });

});
