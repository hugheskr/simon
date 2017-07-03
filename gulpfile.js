const gulp = require('gulp'),
      webpack = require('webpack'),
      webpackStream = require('webpack-stream');

gulp.task('css:dev', function() {
  gulp.src(__dirname + '/app/*.css')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('html:dev', function() {
  gulp.src(__dirname + '/app/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack:dev', function() {
  gulp.src(__dirname + '/app/*.js')
    .pipe(webpackStream({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('default', ['html:dev','webpack:dev','css:dev']);