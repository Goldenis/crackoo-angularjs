'use strict';

describe('Service: apiconfig', function () {

  // load the service's module
  beforeEach(module('crackooApp'));
  beforeEach(module('apiconfig'));


  // instantiate service
  var ENV;
  beforeEach(inject(function(_ENV_) {
    ENV = _ENV_;
  }));

  it('should do something', function () {
    expect(!!ENV).toBe(true);
  });

});
