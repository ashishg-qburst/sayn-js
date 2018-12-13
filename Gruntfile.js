module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      dist: {
        src: ['dist/**/*'],
      }
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'dist/app.js': 'src/**/*.js'
        }
      }
    },

    watch: {
      options: {
        spawn: false,
        livereload: 2002
      },

      scripts: {
        files: ['src/**/*.js'],
        tasks: ['browserify:development']
      },

      css: {
        files: ['src/**/*.scss'],
        tasks: ['sassify']
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/app.css': 'src/styles/app.scss'
        }
      },

      production: {
        options: {
          sourcemap: 'none'
        },
        files: {
          'dist/app.css': 'src/styles/app.scss'
        }
      }
    },

    browserify: {
      development: {
        src: [
          "./src/**/*.js"
        ],
        dest: './dist/app.js',
        options: {
          browserifyOptions: { debug: true },
          transform: [["babelify"]]
        }
      },

      production: {
        src: [
          "./src/**/*.js"
        ],
        dest: './dist/app.js',
        options: {
          browserifyOptions: { debug: false },
          transform: [["babelify"], ['uglifyify', { sourceMap: false }]]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['serve']);
  grunt.registerTask('sassify', ['sass:dist']);
  grunt.registerTask('build', ['clean:dist', 'browserify:production', 'sass:production']);
  grunt.registerTask('serve', ['clean:dist', 'browserify:development', 'sassify', 'watch']);
};
