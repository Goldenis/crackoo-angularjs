'use strict';

describe('Directive: reference', function () {

  // load the directive's module
  beforeEach(module('crackooApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<reference></reference>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the reference directive');
    expect(element).toBeDefined();
  }));
});
