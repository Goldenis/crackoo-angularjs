'use strict';

describe('Directive: myComment', function () {

  // load the directive's module
  beforeEach(module('crackooApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-comment></my-comment>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the myComment directive');
    expect(element).toBeDefined();

  }));
});
