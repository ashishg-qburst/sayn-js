module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'dist/app.js': 'src/app.js'
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['browserify:development'],
        options: {
          spawn: false,
          livereload: 2002,
        },
      },
    },

    browserify: {
      development: {
        src: [
          "./src/*.js"
        ],
        dest: './dist/app.js',
        options: {
          browserifyOptions: { debug: true },
          transform: [["babelify"]]
        }
      },

      production: {
        src: [
          "./src/*.js"
        ],
        dest: './dist/app.js',
        options: {
          browserifyOptions: { debug: false },
          transform: [["babelify"], ['uglifyify', { sourceMap: false }]]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['babel']);
};
