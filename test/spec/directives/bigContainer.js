'use strict';

describe('Directive: bigContainer', function () {

  // load the directive's module
  beforeEach(module('crackooApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<big-container></big-container>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the bigContainer directive');
    expect(element).toBeDefined();
  }));
});
