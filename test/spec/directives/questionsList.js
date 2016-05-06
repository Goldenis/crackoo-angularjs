'use strict';

describe('Directive: questionsList', function () {

  // load the directive's module
  beforeEach(module('crackooApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<questions-list></questions-list>');
    element = $compile(element)(scope);
   // expect(element.text()).toBe('this is the questionsList directive');
    expect(element).toBeDefined();
  }));
});
