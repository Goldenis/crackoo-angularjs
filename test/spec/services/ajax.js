'use strict';

describe('Service: ajax', function () {

  // load the service's module
  beforeEach(module('crackooApp'));

  // instantiate service
  var $ajax;
  beforeEach(inject(function(_$ajax_) {
    $ajax = _$ajax_;
  }));

  it('should do something', function () {
    expect(!!$ajax).toBe(true);
  });

});
