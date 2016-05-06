'use strict';

describe('Directive: bar', function () {

  // load the directive's module
  beforeEach(module('crackooApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bar></bar>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the bar directive');
    expect(element).toBeDefined();
  }));
});
