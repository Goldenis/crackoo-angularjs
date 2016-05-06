'use strict';

describe('Service: answer', function () {

  // load the service's module
  beforeEach(module('crackooApp'));

  // instantiate service
  var AnswerService;
  beforeEach(inject(function(_AnswerService_) {
    AnswerService = _AnswerService_;
  }));

  it('should do something', function () {
    expect(!!AnswerService).toBe(true);
  });

});
