'use strict';
var gulp = require('gulp'),
    //uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    scss = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps')//,
    //inject = require('gulp-inject-string');

//Function for handling errorHandler
var onError = function(err) {
    console.log('An error occured: ', err.message);
    this.emit('end');
};

//for more info: https://www.npmjs.com/package/gulp-sass
gulp.task('scss', function() {
    return gulp.src('./assets/sass/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('style.scss'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(scss({outputStyle: 'compressed'})
        .on('error', scss.logError))// with this part ".on('error', sass.logError)" you prevent gulp file break on errors
        .pipe(sourcemaps.write())//Write sourcemaps
        .pipe(gulp.dest('./dist/css'));
});



gulp.task('watch', function() {
    gulp.watch('assets/sass/*.scss', ['scss']);
});

gulp.task('default', ['scss', 'watch'], function() {
    console.log('Default task is running!');
});
