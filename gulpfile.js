const gulp = require('gulp'),
      webpack = require('webpack'),
      webpackStream = require('webpack-stream'),
      sass = require('gulp-sass');

gulp.task('sass:dev', function() {
  gulp.src(__dirname + '/app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(__dirname + '/build'));
});

// gulp.task('sass:dev', function() {
//   gulp.src('./app/sass/**/*.scss')
//     .pipe(maps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(minifyCss())
//     .pipe(maps.write('./'))
//     .pipe(gulp.dest('./build'));
// });

gulp.task('html:dev', function() {
  gulp.src(__dirname + '/app/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('mp3:dev', function() {
  gulp.src(__dirname + '/app/*.mp3')
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

gulp.task('default', ['html:dev','webpack:dev','sass:dev','mp3:dev']);