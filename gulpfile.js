'use strict';

var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var istanbul = require('gulp-istanbul');
var log = require('gulp-util').log;

var jshint = require('gulp-jshint');

var codeFiles = ['serpa.js', 'spec/serpa-spec.js'];

gulp.task('lint', function() {
  log('Linting Files');
  return gulp.src(codeFiles)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter());
});

gulp.task('jasmine', function(cb) {
  gulp.src(codeFiles)
    .pipe(istanbul()) // Covering files
    .on('end', function () {
        gulp.src('spec/serpa-spec.js')
        .pipe(jasmine())
        .pipe(istanbul.writeReports()) // Creating the reports after tests runned
        .on('end', cb);
    });
});

gulp.task('watch', function() {
  log('Watching Files');
  gulp.watch(codeFiles, ['lint', 'jasmine']);
});

gulp.task('default', ['jasmine', 'lint', 'watch']);
