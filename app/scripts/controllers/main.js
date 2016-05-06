'use strict';
/**
 * @ngdoc function
 * @name crackooApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the crackooApp
 */
angular.module('crackooApp').controller('MainCtrl', [ '$scope','$rootScope', function ($scope,$rootScope) {

  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  $rootScope.$watch(function(){ MathJax.Hub.Queue(['Typeset', MathJax.Hub,'crackoo-body']); });
}]);
