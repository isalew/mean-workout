// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here

    // JS TASKS ================================================================

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        // use jshint-stylish to errors look and read good
        reporter: require('jshint-stylish')
      },
      // when this task is run, lint the Gruntfile and all js files in public
      build: ['Gruntfile.js','public/js/**/*.js','app/**/*.js','server.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'public/dist/js/app.min.js': ['public/js/**/*.js','public/js/*.js']
        }
      }
    },

    // CSS TASKS ===============================================================

    // compile less stylesheets to css  ----------------------------------------
    less: {
      build: {
        files: {
          'public/dist/css/style.css': 'public/css/style.less'
        }
      }
    },

    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'public/dist/css/style.min.css': 'public/dist/css/style.css'
        }
      }
    },

    // MONITOR TASKS ===========================================================

    // configure watch to monitor files and process the above tasks ------------
    watch: {
      // STYLESHEETS
      // watch CSS and LESS files
      // run less and cssmin
      stylesheets: {
        files: ['public/css/**/*.css','public/css/**/*.less'],
        tasks: ['less','cssmin']
      },

      // SCRIPTS
      // watch JS files
      // run jshint and uglify
      scripts: {
        files: ['public/js/**/*.js'],
        tasks: ['jshint','uglify']
      }

    },

    // configure nodemon to start the server -----------------------------------
    nodemon: {
      dev: {
        script: './bin/www'
      }
    }

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-less');
//grunt.loadNpmTasks('grunt-contrib-compass'); // use for sass
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');


  // ===========================================================================
  // CREATE GRUNT TASKS ========================================================
  // ===========================================================================

  // this default task will go through all configuration (dev and production))
  grunt.registerTask('default',['jshint','uglify','cssmin','less','nodemon']);


};
