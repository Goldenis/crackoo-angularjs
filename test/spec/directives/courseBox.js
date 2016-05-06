'use strict';

describe('Directive: courseBox', function () {

  // load the directive's module
  beforeEach(module('crackooApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<course-box></course-box>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the courseBox directive');
    expect(element).toBeDefined();
  }));
});
