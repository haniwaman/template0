var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssdeclsort = require('css-declaration-sorter');
var mqpacker = require('css-mqpacker');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

gulp.task('sass', function() {
	return gulp.src('./sass/**/*.scss')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(postcss([autoprefixer()]))
		.pipe(postcss([cssdeclsort({order: 'alphabetically'})]))
		.pipe(postcss([mqpacker()]))
		.pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass']);
});