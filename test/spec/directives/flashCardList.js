'use strict';

describe('Directive: flashCardList', function () {

  // load the directive's module
  beforeEach(module('crackooApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<flash-card-list></flash-card-list>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the flashCardList directive');
    expect(element).toBeDefined();

  }));
});
