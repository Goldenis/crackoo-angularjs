'use strict';

angular.module('crackooApp')
  .filter('Math', [function () {
    return function (input) {
      //input is a course
      //check that course has a tag related to math.
      //you may need to define the list of tags related to maths
      //console.log(input);
      return input;
    };
  }]);
