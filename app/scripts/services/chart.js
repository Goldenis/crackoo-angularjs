'use strict';
angular.module('crackooApp').factory('ChartService', [
  'ENV',
  '$window',
  '$rootScope',
  function (config, $window, $rootScope) {
    var graph = null;
    var width = 1000, height = 500;
    return {
      base_url: config.basepath,
      stacked: function (src, container) {
        //      console.log(src);
        var nv = $window.nv;
        if (graph !== null) {
          var parent = angular.element(container).parent();
          d3.select(container).remove();
          parent.append('<svg style="margin-top: 30px;"></svg>');
        }
        nv.addGraph(function () {
          var chart = nv.models.multiBarChart()  //.barColor(d3.scale.category20().range())
.margin({
            top: 30,
            right: 20,
            bottom: 130,
            left: 100
          }).transitionDuration(300)  //.delay(0)
                                      //.rotateLabels(45)
.height(height).width(width);
          //.groupSpacing(0.1);
          //        chart.multibar
          //          .hideable(true);
          chart.xAxis.rotateLabels(45).tickFormat(function (d) {
            return d3.time.format('%b %d, %Y')(new Date(d));
          });
          chart.yAxis.axisLabel('No. of Study Items');
          //.tickFormat(d3.format(',.1f'));
          //alert(JSON.stringify(src.children));
          d3.select(container).datum(src.children).transition().duration(500).attr('height', height).attr('width', width).call(chart);
          nv.utils.windowResize(chart.update);
          chart.multibar.dispatch.on('elementClick', function (e) {
            console.log(e);
            //console.log(JSON.stringify(e));
            console.log('element: ' + e.point.label);
            /**Study Type**/
            console.log(e.series.key);
          });
          chart.dispatch.on('stateChange', function (e) {
            nv.log('New State:', JSON.stringify(e));
          });
          graph = chart;
          return chart;
        });
      },
      /** Horizontal bar chart for topic wise/Focus report**/
      bar: function (src, container) {
        if (graph !== null) {
          var parent = angular.element(container).parent();
          d3.select(container).remove();
          parent.append('<svg style="margin-top: 30px;"></svg>');
        }
        var tooltip = function (key, x, y) {
          return '' + '<h3><strong>' + key + '</strong></h3>' + '<h3><strong>' + y + '% of ' + x + '</strong></h3>';
        };
        nv.addGraph(function () {
          var totalBarChartHeight = src.children[0].values.length * 60;
          if (totalBarChartHeight < 500) {
            totalBarChartHeight = 500;
          }
          var chart = nv.models.multiBarHorizontalChart().x(function (d) {
            return d.label;
          }).y(function (d) {
            return d.value;
          }).margin({
            top: 30,
            right: 20,
            left: 175
          })  // .showValues(true)
.tooltips(true).showControls(false).tooltip(tooltip).height(totalBarChartHeight).width(width).stacked(true);
          chart.yAxis.axisLabel('(%) Completion').tickFormat(d3.format(',.2f'));
          d3.select(container).datum(src.children).transition().duration(500).attr('height', totalBarChartHeight).attr('width', width).call(chart);
          //alert(JSON.stringify(src));
          console.log('Number of Focus value are ' + src.children[0].values.length);
          nv.utils.windowResize(chart.update);
          //for bar chart hover cursor
          d3.selectAll('.nv-bar').style('cursor', 'pointer');
          graph = chart;
          chart.multibar.dispatch.on('elementClick', function (focusevent) {
            //console.log(e);
            //console.log(focusevent);
            var focuslabel = focusevent.point.label;
            console.log(focuslabel);
            console.log('inside chart label is ' + focuslabel);
            var focuskey = focusevent.series.key;
            $rootScope.$broadcast('focus:updated', focusevent, focuslabel, focuskey);
          });
          return chart;
        });
      },
      line: function (src, container) {
        if (graph !== null) {
          var parent = angular.element(container).parent();
          d3.select(container).remove();
          parent.append('<svg style="margin-top: 30px;"></svg>');
        }
        nv.addGraph(function () {
          var chart = nv.models.lineChart().margin({
            top: 30,
            right: 20,
            bottom: 130,
            left: 100
          }).tooltips(true).width(width).height(height);
          chart.xAxis.axisLabel('Date').rotateLabels(45).tickFormat(function (d) {
            return d3.time.format('%b %d, %Y')(new Date(d));
          });
          chart.yAxis.axisLabel('Number of Study Items');
          //.tickFormat(d3.format('.02f'));
          //alert(JSON.stringify(line_data()));
          //alert(JSON.stringify(src.children[0].values));
          d3.select(container).datum(src.children[0].values).transition().duration(500).attr('height', height).attr('width', width).call(chart);
          nv.utils.windowResize(chart.update);
          graph = chart;
          return chart;
        });
      },
      pie: function (src, container) {
        console.log('pie charts');
        if (graph !== null) {
          var parent = angular.element(container).parent();
          d3.select(container).remove();
          parent.append('<svg style="margin-top: 30px;"></svg>');
        }
        nv.addGraph(function () {
          var width = 1000, height = 500;
          var chart = nv.models.pieChart().x(function (d) {
            return d.label;
          }).y(function (d) {
            return d.value;
          }).color([
            '#98df8a',
            '#ff7f0e',
            '#F99'
          ]).width(width).noData('No Data Available').tooltipContent(function (key, y) {
            return '<h3><strong>' + key + '</strong></h3>' + '<p><strong>' + y + ' %</strong></p>';
          }).height(height);
          chart.pie.pieLabelsOutside(false).labelType('percent');
          console.log(src.children[0].values);
          d3.select(container).datum(src.children[0].values).transition().duration(1200).attr('height', height).attr('width', width).attr('margin-top', 30).call(chart);
          //for pie chart clik event capture[START]
          d3.selectAll('.nv-slice').on('click', function (d) {
            //clear all tooltip
            $('.nvtooltip.xy-tooltip').hide();
            $rootScope.$broadcast('chart:updated', d, src.children[0].key);
          });
          //for pie chart clik event capture[END]
          //for pie chart hover cursor
          d3.selectAll('.nv-slice').style('cursor', 'pointer');
          chart.dispatch.on('stateChange', function (e) {
            nv.log('New State:', JSON.stringify(e));
          });
          graph = chart;
          return chart;
        });
      }
    };
  }
]);
