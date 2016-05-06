'use strict';

describe('Service: NoteService', function () {

  // load the service's module
  beforeEach(module('crackooApp'));

  // instantiate service
  var NoteService;
  beforeEach(inject(function(_NoteService_) {
    NoteService = _NoteService_;
  }));

  it('should do something', function () {
    expect(!!NoteService).toBe(true);
  });

});
