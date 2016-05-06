'use strict';

describe('Directive: questionFooter', function () {

  // load the directive's module
  beforeEach(module('crackooApp'));

  var element,
    scope, compile;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<question-footer></question-footer>');
    element = $compile(element)(scope);
    expect(element).toBeDefined();

  }));
});
