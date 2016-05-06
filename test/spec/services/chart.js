'use strict';

describe('Service: chart', function () {

  // load the service's module
  beforeEach(module('crackooApp'));

  // instantiate service
  var ChartService;
  beforeEach(inject(function(_ChartService_) {
    ChartService = _ChartService_;
  }));

  it('should do something', function () {
    expect(!!ChartService).toBe(true);
  });

});
