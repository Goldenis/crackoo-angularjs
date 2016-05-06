'use strict';

describe('Service: QuestionService', function () {

  // load the service's module
  beforeEach(module('crackooApp'));

  // instantiate service
  var QuestionService;
  beforeEach(inject(function(_QuestionService_) {
    QuestionService = _QuestionService_;
  }));

  it('should do something', function () {
    expect(!!QuestionService).toBe(true);
  });

});
