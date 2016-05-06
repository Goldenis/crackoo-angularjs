// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-03-31 using
// generator-karma 0.9.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [


      // bower:js
      'app/bower_components/es5-shim/es5-shim.js',
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/moment/moment.js',
      'app/bower_components/jquery-mousewheel/jquery.mousewheel.js',
      'app/bower_components/json3/lib/json3.min.js',
      'app/bower_components/d3/d3.js',
      'app/bower_components/nvd3/nv.d3.js',
      'app/bower_components/angularytics/dist/angularytics.min.js',
      'app/bower_components/jquery-sticky/jquery.sticky.js',
      'app/bower_components/bxslider-4/dist/jquery.bxslider.js',
      'app/bower_components/bxslider-4/dist/jquery.bxslider.min.js',
      'app/bower_components/angular-moment/angular-moment.js',
      'app/bower_components/jquery-ui/jquery-ui.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 2020,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      //'Chrome'
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      //'karma-chrome-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
