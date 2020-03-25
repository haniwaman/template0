const gulp = require("gulp");

/* sass */
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const sassGlob = require("gulp-sass-glob");
const mmq = require("gulp-merge-media-queries");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssdeclsort = require("css-declaration-sorter");

/* browser-sync */
const browserSync = require("browser-sync");

/* imagemin */
const imagemin = require("gulp-imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminOption = [
	imageminPngquant({ quality: [0.65, 0.8] }),
	imageminMozjpeg({ quality: 85 }),
	imagemin.gifsicle({
		interlaced: false,
		optimizationLevel: 1,
		colors: 256
	}),
	imagemin.mozjpeg(),
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
		.pipe(postcss([cssdeclsort({ order: "alphabetical" })]))
		.pipe(mmq())
		.pipe(gulp.dest("./css"));
});

gulp.task("watch", function(done) {
	gulp.watch("./sass/**/*.scss", gulp.task("sass"));
	gulp.watch("./sass/**/*.scss", gulp.task("bs-reload"));
	gulp.watch("./js/*.js", gulp.task("bs-reload"));
	gulp.watch("./*.html", gulp.task("bs-reload"));
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

gulp.task("default", gulp.series(gulp.parallel("browser-sync", "watch")));
