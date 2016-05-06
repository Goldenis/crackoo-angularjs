'use strict';
angular.module('crackooApp').directive('progressBar', [
  '$location',
  '$window',
  function ($location, $window) {
    return {
      restrict: 'EA',
      template: '<svg width=\'100%\' height=\'7\'></svg>',
      scope: { chartData: '@' },
      link: function postLink(scope, element) {
        var d3 = $window.d3;
        var rawSvg = element.find('svg')[0];
        var percentage = parseInt(scope.chartData);

        function drawChart(percentage) {
          var svg = d3.select(rawSvg).append('g');
          //var innerRact =
            svg.append('rect').attr('width', '100%').attr('height', '5px').attr('x', 0).attr('y', 2).attr('rx', 2).attr('ry', 2).style('fill', '#f4f8fb');
          //var outerRact =
            svg.append('rect').attr('width', '0%').attr('height', '5px').attr('x', 0).attr('y', 2).attr('rx', 2).attr('ry', 2).style('fill', '#81be4a').transition().attr('width', calculatePercent(percentage)).duration(500);
        }
        drawChart(percentage);
        function calculatePercent(percent) {
          return percent + '%';
        }
      }
    };
  }
]);
