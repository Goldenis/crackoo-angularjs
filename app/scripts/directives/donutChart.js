'use strict';
angular.module('crackooApp').directive('donutChart', [
  '$location',
  '$window',
  function ($location, $window) {
    return {
      restrict: 'EA',
      template: '<svg width=\'110\' height=\'110\'></svg>',
      scope: {
        chartData: '@',
        chartType: '@'
      },
      link: function postLink(scope, element) {
        var width = 110, height = 110, text_y = '.35em', duration = 500;
        //var transition = 200;
        var d3 = $window.d3;
        var rawSvg = element.find('svg')[0];
        //                var svg = d3.select(rawSvg);
        var percentage = 0;
        if(scope.chartData != undefined){
          percentage = parseInt(scope.chartData);
        }

        function drawChart(percent) {
          var dataset = {
              lower: calcPercent(0),
              upper: calcPercent(percent)
            }, radius = Math.min(width, height) / 2, pie = d3.layout.pie().sort(null), format = d3.format('.0%');
          var arc = d3.svg.arc().innerRadius(radius * 0.65).outerRadius(radius * 0.85);
          var overLapArc = d3.svg.arc().innerRadius(radius * 0.66).outerRadius(radius * 0.84).startAngle(0).endAngle(360);
          var svg = d3.select(rawSvg).append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
          svg.append('path').attr('id', 'innerRing').attr('d', overLapArc).style('stroke', 'white');
          //                        .attr("transform","translate("+width+","+height-(height/2)+")");
          var colors = [
            '#f4f8fb',
            '#7ebd4a',
            '#2f3640'
          ];
          var path = svg.selectAll('.outer-ring').data(pie(dataset.lower)).enter().append('path').attr('class', 'outer-ring').style('fill', function (d, i) {
            //                            arrpos.push(arc.centroid(d));
            //                            console.log(arrpos) ;
            var style = colors[0];
            if (i === 0) {
              if (scope.chartType === 'correct') {
                style = colors[1];
              } else {
                style = colors[2];
              }
            }
            return style;
          }).attr('d', arc).each(function (d) {
            this._current = d;
          });
          // store the initial values
          var text = svg.append('text').attr('id', 'textPercentage').attr('text-anchor', 'middle').attr('dy', text_y);
          if (typeof percent === 'string') {
            text.text(percent);
          } else {
            var progress = 0;
            var timeout = setTimeout(function () {
              clearTimeout(timeout);
              path = path.data(pie(dataset.upper));
              // update the data
              path.transition().duration(duration).attrTween('d', function (a) {
                // Store the displayed angles in _current.
                // Then, interpolate from _current to the new angles.
                // During the transition, _current is updated in-place by d3.interpolate.
                var i = d3.interpolate(this._current, a);
                var i2 = d3.interpolate(progress, percent);
                this._current = i(0);
                return function (t) {
                  text.text(format(i2(t) / 100));
                  return arc(i(t));
                };
              });  // redraw the arcs
            }, 200);
          }
        }
        drawChart(percentage);
        function calcPercent(percent) {
          return [
            percent,
            100 - percent
          ];
        }
      }
    };
  }
]);
