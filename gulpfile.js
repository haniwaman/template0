var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var sassGlob = require("gulp-sass-glob");
var mmq = require("gulp-merge-media-queries");
var browserSync = require("browser-sync");
var imagemin = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminMozjpeg = require("imagemin-mozjpeg");

var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssdeclsort = require("css-declaration-sorter");

var ejs = require("gulp-ejs");
var rename = require("gulp-rename");
var replace = require("gulp-replace");

var imageminOption = [
	imageminPngquant({ quality: "65-80" }),
	imageminMozjpeg({ quality: 85 }),
	imagemin.gifsicle({
		interlaced: false,
		optimizationLevel: 1,
		colors: 256
	}),
	imagemin.jpegtran(),
	imagemin.optipng(),
	imagemin.svgo()
];

gulp.task("sass", function() {
	return gulp
		.src("./sass/**/*.scss")
		.pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
		.pipe(sassGlob())
		.pipe(sass({ outputStyle: "expanded" }))
		.pipe(postcss([autoprefixer()]))
		.pipe(postcss([cssdeclsort({ order: "alphabetically" })]))
		.pipe(mmq())
		.pipe(gulp.dest("./css"));
});

gulp.task("watch", function(done) {
	gulp.watch("./sass/**/*.scss", gulp.task("sass"));
	gulp.watch("./sass/**/*.scss", gulp.task("bs-reload"));
	gulp.watch("./js/*.js", gulp.task("bs-reload"));
	gulp.watch("./*.html", gulp.task("bs-reload"));
	gulp.watch("./ejs/**/*.ejs", gulp.task("ejs"));
	gulp.watch("./ejs/**/*.ejs", gulp.task("bs-reload"));
});

gulp.task("browser-sync", function(done) {
	browserSync.init({
		server: {
			baseDir: "./",
			index: "index.html"
		}
	});
	done();
});

gulp.task("bs-reload", function(done) {
	browserSync.reload();
	done();
});

gulp.task("imagemin", function() {
	return gulp
		.src("./img/**/*")
		.pipe(imagemin(imageminOption))
		.pipe(gulp.dest("./img"));
});

gulp.task("ejs", done => {
	gulp
		.src(["ejs/**/*.ejs", "!ejs/**/_*.ejs"])
		.pipe(ejs({}, {}, { ext: ".html" }))
		.pipe(rename({ extname: ".html" }))
		.pipe(replace(/[\s\S]*?(<!DOCTYPE)/, "$1"))
		.pipe(gulp.dest("./"));
	done();
});

gulp.task("default", gulp.series(gulp.parallel("browser-sync", "watch")));
