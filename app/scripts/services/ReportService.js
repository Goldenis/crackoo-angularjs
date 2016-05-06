'use strict';
angular.module('crackooApp').factory('ReportService', [
  '$rootScope',
  '$ajax',
  'ENV',
  '$q',
  function ($rootScope, $ajax, config) {
    return {
      base_url: config.basepath,
      getProgressData: function (uid, gid, timeframe) {
        var _self = this;
        var promise = $ajax({
          method: 'GET',
          url: _self.base_url + '/reports/users/' + uid + '/goals/' + gid + '/mockprogress/' + timeframe
        });
        return promise;
      },
      getStudyactivityData: function (uid, gid, timeframe) {
        var _self = this;
        var promise = $ajax({
          method: 'GET',
          url: _self.base_url + '/reports/users/' + uid + '/goals/' + gid + '/mockstudyactivity/' + timeframe
        });
        return promise;
      },
      getFocusData: function (uid, gid) {
        var _self = this;
        var promise = $ajax({
          method: 'GET',
          url: _self.base_url + '/reports/users/' + uid + '/goals/' + gid + '/focus'
        });
        return promise;  /*return $q.when([
              {
                "key": "Correct",
                "color": "#98df8a",
                "values": [
                  {
                    "label" : "Algebra" ,
                    "value" : 23
                  } ,
                  {
                    "label" : "Geometry" ,
                    "value" : 10
                  } ,
                  {
                    "label" : "Trignometry" ,
                    "value" : 30
                  } ,
                  {
                    "label" : "Calculus" ,
                    "value" : 90
                  }
                ]
              },
              {
                "key": "Incorrect",
                "color": "#ff7f0e",
                "values": [
                  {
                    "label" : "Algebra" ,
                    "value" : 25
                  } ,
                  {
                    "label" : "Geometry" ,
                    "value" : 16
                  },
                  {
                    "label" : "Trignometry" ,
                    "value" : 10
                  } ,
                  {
                    "label" : "Calculus" ,
                    "value" : 10
                  }

                ]
              },
              {
                "key": "unattempted",
                "color": "#F99",
                "values": [
                  {
                    "label" : "Algebra" ,
                    "value" : 25
                  } ,
                  {
                    "label" : "Geometry" ,
                    "value" : 70
                  },
                  {
                    "label" : "Trignometry" ,
                    "value" : 30
                  },
                  {
                    "label" : "Calculus" ,
                    "value" : 10
                  }

                ]
              }
            ]);*/
      },
      getConfidencelevel: function (uid, gid) {
        var _self = this;
        var promise = $ajax({
          method: 'GET',
          url: _self.base_url + '/reports/users/' + uid + '/goals/' + gid + '/confidencelevel'
        });
        return promise;  /*return $q.when([{
                    key: "Cumulative Return",
                    values: [
                      {
                        "label": "confident",
                        "value" : 60
                      } ,
                      {
                        "label": "notsure",
                        "value" : 25
                      } ,
                      {
                        "label": "others",
                        "value" : 15
                      }
                    ]
                  }]);*/
      },
      getStatusReport: function (uid, gid) {
        var _self = this;
        var promise = $ajax({
          method: 'GET',
          url: _self.base_url + '/reports/users/' + uid + '/goals/' + gid + '/status'
        });
        return promise;  /*return $q.when([{
           key: "Cumulative Return",
           values: [
           {
           "label": "confident",
           "value" : 60
           } ,
           {
           "label": "notsure",
           "value" : 25
           } ,
           {
           "label": "others",
           "value" : 15
           }
           ]
           }]);*/
      },
      getTimelevel: function (uid, gid) {
        var _self = this;
        var promise = $ajax({
          method: 'GET',
          url: _self.base_url + '/reports/users/' + uid + '/goals/' + gid + '/timelevel'
        });
        return promise;  /*return $q.when([{
                    key: "Cumulative Return",
                    values: [
                      {
                        "label": "fast(less than average time)",
                        "value" : 60
                      } ,
                      {
                        "label": "slow(more than average time)",
                        "value" : 20
                      } ,
                      {
                        "label": "unattempted",
                        "value" : 20
                      }                     ]
                  }]);*/
      },
      getDifficultylevel: function (uid, gid) {
        var _self = this;
        var promise = $ajax({
          method: 'GET',
          url: _self.base_url + '/reports/users/' + uid + '/goals/' + gid + '/difficultylevel'
        });
        return promise;  /*return $q.when([{
                    key: "Cumulative Return",
                    values: [
                      {
                        "label": "easy",
                        "value" : 45
                      } ,
                      {
                        "label": "difficult",
                        "value" : 35
                      } ,
                      {
                        "label": "other",
                        "value" : 20
                      } ]
                  }]);*/
      },
      getReviewReport: function (uid, gid) {
        var _self = this;
        var promise = $ajax({
          method: 'GET',
          url: _self.base_url + '/reports/users/' + uid + '/goals/' + gid + '/review'
        });
        return promise;
      }
    };
  }
]);
