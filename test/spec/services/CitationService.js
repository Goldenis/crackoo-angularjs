'use strict';

describe('Service: CitationService', function () {

  // load the service's module
  beforeEach(module('crackooApp'));

  // instantiate service
  var CitationService;
  beforeEach(inject(function(_CitationService_) {
    CitationService = _CitationService_;
  }));

  it('should do something', function () {
    expect(!!CitationService).toBe(true);
  });

});
