"use strict";

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mocha = require('gulp-mocha');

gulp.task('lint', function() {
    return gulp.src('./lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('test', function () {
    return gulp.src('test/test.js', {read: false})
            .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['lint', 'test']);
