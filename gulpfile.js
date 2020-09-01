var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var uglify = require('gulp-terser');
//var babel = require('gulp-babel')

gulp.task('js', function () {
    return gulp.src('src/js/app.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-css', function () {
    return gulp.src('src/css/app.css')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js-watch', gulp.parallel('js', function (done) {
    browserSync.reload();
    done();
}));

gulp.task('default', gulp.parallel('js', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/js/*.js", gulp.parallel('js-watch'));
    gulp.watch("src/css/*.css", gulp.parallel('copy-css'));
}));