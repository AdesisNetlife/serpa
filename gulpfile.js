'use strict';

var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var log = require('gulp-util').log;

var jshint = require('gulp-jshint');

var codeFiles = ['**/*.js', '!node_modules/**'];

gulp.task('lint', function() {
  log('Linting Files');
  return gulp.src(codeFiles)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter());
});

gulp.task('jasmine', function() {
    gulp.src('spec/serpa-spec.js')
        .pipe(jasmine());
});

gulp.task('watch', function() {
  log('Watching Files');
  gulp.watch(codeFiles, ['lint', 'jasmine']);
});

gulp.task('default', ['jasmine', 'lint', 'watch']);
