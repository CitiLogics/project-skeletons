module.exports = function(grunt) {

  var svelte = require('rollup-plugin-svelte');
  var resolve = require('rollup-plugin-node-resolve');
  var commonjs = require('rollup-plugin-commonjs');
  var buble = require('rollup-plugin-buble');
  var uglify = require('rollup-plugin-uglify');

  const production = false;//!process.env.ROLLUP_WATCH;

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: 'index.js',
        options: {
          legacyWatch: true,
          watch:  ['Gruntfile.js','index.js','server/']
        },
      }
    },

    jshint: {
      client: ['client/src/*.js'],
      server: ['index.js', 'server/*.js'],
      options: {
        esversion: 6,
        asi: true,
        force: true
      }
    },

    watch: {
      client: {
        files: ['client/src/*.js','client/src/*.html'],
        tasks: ['jshint:client','rollup']
      },
      server: {
        files: ['server/*.js','index.js'],
        tasks: ['jshint:server']
      }
    },

    rollup: {
      options: {
      	moduleName: 'app',
        sourceMap: true,
        format: 'iife',
        plugins: [
          svelte({
      			// enable run-time checks when not in production
      			dev: !production,
      			css: css => {
      				css.write('client/dist/bundle.css');
      			},
      			cascade: false
      		}),

      		resolve(),
      		commonjs(),

      		production && buble({ exclude: 'node_modules/**' }),
      		production && uglify()
        ]
      },
      files: {
        'src': 'client/src/main.js',
        'dest': 'client/dist/bundle.js'
      }
    },

    concurrent: {
      target: {
        tasks: ['nodemon', 'watch:client','watch:server'],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-rollup');

  // Default task(s).
  grunt.registerTask('default', ['dev']);
  grunt.registerTask('build', ['jshint:client','jshint:server','rollup']);
  grunt.registerTask('dev', ['build','concurrent']);

};
