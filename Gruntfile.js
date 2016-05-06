// Generated on 2015-03-31 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
var modRewrite = require('connect-modrewrite');

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  //require('grunt-remove-logging')(grunt);
  grunt.loadNpmTasks('grunt-html-snapshot');

  //grunt.loadNpmTasks( "grunt-remove-logging" );

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,


    //htmlSnapshot: {
    //  all: {
    //    options: {
    //      //that's the path where the snapshots should be placed
    //      //it's empty by default which means they will go into the directory
    //      //where your Gruntfile.js is placed
    //      snapshotPath: 'snapshots/',
    //      //This should be either the base path to your index.html file
    //      //or your base URL. Currently the task does not use it's own
    //      //webserver. So if your site needs a webserver to be fully
    //      //functional configure it here.
    //      sitePath: 'http://localhost:9000/',
    //      //you can choose a prefix for your snapshots
    //      //by default it's 'snapshot_'
    //      fileNamePrefix: 'sp_',
    //      //by default the task waits 500ms before fetching the html.
    //      //this is to give the page enough time to to assemble itself.
    //      //if your page needs more time, tweak here.
    //      msWaitForPages: 1000,
    //      //sanitize function to be used for filenames. Converts '#!/' to '_' as default
    //      //has a filename argument, must have a return that is a sanitized string
    //      sanitize: function (requestUri) {
    //        //returns 'index.html' if the url is '/', otherwise a prefix
    //        if (/\/$/.test(requestUri)) {
    //          return 'index.html';
    //        } else {
    //          return requestUri.replace(/\//g, 'prefix-');
    //        }
    //      },
    //      //if you would rather not keep the script tags in the html snapshots
    //      //set `removeScripts` to true. It's false by default
    //      removeScripts: true,
    //      //set `removeLinkTags` to true. It's false by default
    //      removeLinkTags: true,
    //      //set `removeMetaTags` to true. It's false by default
    //      removeMetaTags: true,
    //      //Replace arbitrary parts of the html
    //      replaceStrings:[
    //        {'this': 'will get replaced by this'},
    //        {'/old/path/': '/new/path'}
    //      ],
    //      // allow to add a custom attribute to the body
    //      bodyAttr: 'data-prerendered',
    //      //here goes the list of all urls that should be fetched
    //      urls: [
    //        '',
    //        //'#!/en-gb/showcase',
    //        '/'
    //      ],
    //      // a list of cookies to be put into the phantomjs cookies jar for the visited page
    //      cookies: [
    //        {"path": "/", "domain": "localhost", "name": "lang", "value": "en-gb"}
    //      ],
    //      // options for phantomJs' page object
    //      // see http://phantomjs.org/api/webpage/ for available options
    //      pageOptions: {
    //        viewportSize : {
    //          width: 1200,
    //          height: 800
    //        }
    //      }
    //    }
    //  }
    //},
    uglify: {
      options: {
        compress: {
          sequences: true,
          properties: true,
          dead_code: true,
          drop_debugger: true,
          unsafe: false,
          conditionals: true,
          comparisons: true,
          evaluate: true,
          booleans: true,
          unused: true,
          hoist_funs: true,
          hoist_vars: false,
          if_return: true,
          join_vars: true,
          cascade: true,
          side_effects: true,
          warnings: true,
          drop_console: true
        },
        beautify: false,
        mangle: true,
        global_defs: {
          DEBUG: false
        }
      }
    },
    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '\'use strict\';\n\n {%= __ngModule %}'
      },
     // Environment targets
      digitalocean: { /**app id for digital ocean 104.236.223.32:8443 **/
        options: {
          name: 'appconfig',
          dest: '<%= yeoman.app %>/scripts/services/appconfig.js',
          constants: {
            APP_ID: {
              name: 'digitalocean',
              appId: '587011841400400'
              //appId: '311700385575642'
            }
          }
        }
      },
      localhost: { /**app ID for the local development: localhost:9000**/
        options: {
          name: 'appconfig',
          dest: '<%= yeoman.app %>/scripts/services/appconfig.js',
          constants: {
            APP_ID: {
              name: 'localhost',
              appId: '311700385575642'
            }
          }
        }
      },
      onlinehome: {
        options: {
          name: 'appconfig',
          dest: '<%= yeoman.app %>/scripts/services/appconfig.js',
          constants: {
            APP_ID: {
              name: 'crackooonlinehomedemo',
              appId: '762061253833349'
            }
          }
        }
      },
        development: {
          options: {
            name: 'apiconfig',
            dest: '<%= yeoman.app %>/scripts/services/apiconfig.js',
            constants: {
              ENV: {
                name: 'development',
                   basepath: 'http://74.208.7.207:7070/crackoo'
                //basepath: 'http://localhost:7070/crackoo'
                //basepath: 'https://www.crackoo.com:8443/crackoo'/**FIXME update when the production server is ready**/


              }
            }
          }
        },
        production: {
          options: {
            name: 'apiconfig',
            dest: '<%= yeoman.app %>/scripts/services/apiconfig.js',
            constants: {
              ENV: {
                name: 'production',
                //basepath: 'https://104.236.223.32:8443/crackoo'/**FIXME update when the production server is ready**/
                basepath: 'https://www.crackoo.com:8443/crackoo'/**FIXME update when the production server is ready**/
                //basepath: 'http://74.208.7.207:8787/crackoo'

              }
            }
          }
        }
    },

    //'removelogging': {
    //  files: {
    //    //cwd: '<%= yeoman.app %>/scripts',
    //    src:['<%= yeoman.app %>/scripts/**/*.js','!<%= yeoman.app %>/bower_components/**'],
    //    dest: ".tmp/removelogging"
    //    //options: {}
    //  }
    //},


    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    fixmyjs: {
      options: {
        config: '.jshintrc',
        indentpref: 'spaces',
        curly: true,
        snakecase: false,
        quotmark: 'single',
        plusplus: true,
        asi: false
      },
      cleanwithfixmyjs: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/scripts',
            src: ['**/*.js','!<%= yeoman.dist %>/bower_components/**'],
            dest: '<%= yeoman.dist %>/fixmyjs/scripts',
            ext: '.js'
          }
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 8100,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              modRewrite(['^[^\\.]*$ /index.html [L]']),
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        //browsers: ['last 1 version']  /**This is the default**/
        /** browsers: ['> 1%', 'last 2 versions', 'ff 17', 'opera 12.1'] **/
        browsers: ['> 1%','last 3 versions', 'ie 8', 'ie 9']
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    injector: {
      options: {ignorePath: '<%= yeoman.app %>/'},
      local_dependencies: {
        files: {
          '<%= yeoman.app %>/index.html': ['<%= yeoman.app %>/scripts/{,*/}*.js','<%= yeoman.app %>/styles/{,*/}*.css','<%= yeoman.app %>/bower_components/nvd3/nv.d3.min.css','<%= yeoman.app %>/bower_components/jquery-ui/themes/base/minified/jquery-ui.min.css','<%= yeoman.app %>/bower_components/fancybox/source/{,*/}*.css','<%= yeoman.app %>/bower_components/bxslider-4/dist/{,*/}*.css',
            '<%= yeoman.app %>/bower_components/angular-loading-bar/src/{,*/}*.css','!<%= yeoman.app %>/scripts/services/htmlReadyInterceptor.js']
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//,
        verbose: true,
      "overrides": {
        "fancybox": {
          "main": "source/jquery.fancybox.js"
        },
        "jquery-ui": {
          "main": "ui/minified/jquery-ui.min.js"
        }
      },
        exclude: [
          '/angular.js','/angular-route','/angular-animate/','/jquery.bxslider.min.js','/jquery/jquery.js','/jquery-mousewheel/*'
        ]
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          //'<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          //'<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['concat','cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/img',
          '<%= yeoman.dist %>/styles'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/img',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/img',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/img'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
          //{
          //  expand: true,
          //  cwd: '<%= yeoman.app %>/js',
          //  dest: '<%= yeoman.dist %>/s',
          //  src: ['script-min.js']
          //},
          //{
          //  expand: true,
          //  cwd: '<%= yeoman.app %>/js/angular-seo-master',
          //  dest: '<%= yeoman.dist %>/s',
          //  src: ['angular-seo.js']
          //},
          {
            expand: true,
            cwd: '<%= yeoman.app %>/bower_components/bxslider-4/dist/images',
            dest: '<%= yeoman.dist %>/styles/images',
            src: ['bx_loader.gif']
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/bower_components/jquery-ui/themes/base/minified/images',
            dest: '<%= yeoman.dist %>/styles/images',
            src: ['*.png']
          },
          {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'img/{,*/}*.{webp}',
            '' +
            'crackoo.com.xml',
            'styles/fonts/{,*/}*.*',
          ]
        },
          {
          expand: true,
          cwd: '.tmp/imsg',
          dest: '<%= yeoman.dist %>/img',
          src: ['generated/*']
        },
          {
          expand: true,
          cwd: '<%= yeoman.app %>/fonts',
          dest: '<%= yeoman.dist %>/fonts',
          src: '{,*/}*'
        },
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {

    /** Using app ID for the local development: localhost:9000**/
    if (target === 'dist') {
      return grunt.task.run(['ngconstant:localhost', 'build', 'connect:dist:keepalive']);
    }

    /** Using appID for online home demo 74.208.7.207:8787**/
    else if(target === 'dist_onlinehome'){
      grunt.task.run([
        'ngconstant:onlinehome'
      ]);
      return grunt.task.run(['ngconstant:onlinehome','devbuild', 'connect:dist:keepalive']);
    }

    /**Using app id for digital ocean 104.236.223.32:8443 **/
    else if(target === 'dist_digitalocean'){
      return grunt.task.run(['ngconstant:digitalocean', 'build', 'connect:dist:keepalive']);
    }

    /** Using appID for online home demo 74.208.7.207:8787**/
    else if(target === 'onlinehome'){
      grunt.task.run([
        'ngconstant:onlinehome'
      ]);
    }

    /**Using app id for digital ocean 104.236.223.32:8443 **/
    else if(target === 'digitalocean'){
      grunt.task.run([
        'ngconstant:digitalocean'
      ]);
    }

    /** Using app ID for the local development: localhost:9000**/
    else if(target === 'localhost'){
      grunt.task.run([
        'ngconstant:localhost'
      ]);
    }

    /** Using app ID for the local development: localhost:9000**/
    else{
      grunt.task.run([
        'ngconstant:localhost'
      ]);
    }


    grunt.task.run([
      'clean:server',
      'ngconstant:development',
      'wiredep',
      'injector',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'injector',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('devbuild', [
    'clean:dist',
    //'bower-install', /** some websites have enabled this. Evaluate if this is a good idea**/
    'ngconstant:development',
    'wiredep', /* to be enabled at a later time*/
    'injector',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin',
  ]);
  grunt.registerTask('build', [
    'clean:dist',
    //'bower-install', /** some websites have enabled this. Evaluate if this is a good idea**/
    'ngconstant:production',
    'wiredep', /* to be enabled at a later time*/
    'injector',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin',
  ]);


  grunt.registerTask('default', [
    'newer:jshint',
    'wiredep',
    'injector',
    'test',
    'build',
    'htmlSnapshot'
  ]);
};
