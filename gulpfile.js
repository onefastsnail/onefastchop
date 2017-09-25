//our basic dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var cache = require('gulp-cached');
var wait = require('gulp-wait');

var scssPath = 'assets/scss/main.scss';
var gulpTaskTimeout = 10;

gulp.task('scss-lint', function lintCssTask() {
    var gulpStylelint = require('gulp-stylelint');

    return gulp
        .src(scssPath)
        .pipe(cache('scsslint'))
        .pipe(gulpStylelint({
            configFile: '.stylelintrc.json',
            failAfterError: false,
            reporters: [
                { formatter: 'string', console: true }
            ],
            debug: true
        }));
});

/**
 * compile, prefix and minify our sass
 */
gulp.task('scss', ['scss-lint'], function() {
    return gulp.src(scssPath)
        .pipe(wait(gulpTaskTimeout))
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie9' }))
        //.pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('assets/dist/css'));
});

/**
 * our watch tasks
 */
gulp.task('watch', [], function() {
    gulp.watch(scssPath, ['scss']);
});

/**
 * the default gulp task used for development
 */
gulp.task('default', ['watch', 'scss']);

/**
 * the build task triggered when deploying, or making the project
 */
gulp.task('build', ['scss']);
