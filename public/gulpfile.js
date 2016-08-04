
var pkg = require('./package.json');

// require gulp plugins
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css');

// paths to source files
var source = {
    js: [
        'src/js/vendor/*.js',
        'src/js/**/*.js'
    ],
    sass: [
        'src/sass/**/*.scss'
    ]
};

gulp.task('js', function() {
    return gulp.src(source.js)
        .pipe(sourcemaps.init())
            .pipe(concat('script.js'))
            .pipe(gulp.dest('js'))
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js'));
});

gulp.task('sass', function() {
    return sass('src/sass/main.scss', { style: 'expanded' })
        .on('error', function (error) {
            console.error(error.message);
        })
        .pipe(autoprefixer('last 2 version', 'ie 8', 'ie 9', '> 1%'))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('css/'))
        .pipe(minifyCSS({ processImport: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css/'));
});

gulp.task('watch', function() {
    gulp.watch(source.js, function() {
        setTimeout(function () {
            gulp.start('js');
        }, 100);
    });
    gulp.watch(source.sass, function() {
        setTimeout(function () {
            gulp.start('sass');
        }, 100);
    });
});

gulp.task('default', ['watch', 'js', 'sass']);
