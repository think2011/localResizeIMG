var gulp   = require('gulp');
var clean  = require('gulp-clean');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var staticHash = require('gulp-static-hash');


var paths = {
    src : 'src',
    dist: 'dist'
};

var pcFile = [
    paths.src + '/lib/exif.js',
    paths.src + '/lrz.js'
];

var mobileFile = [
    paths.src + '/lib/exif.js',
    paths.src + '/lib/mobileFix.mini.js',
    paths.src + '/lrz.js'
];

// pc
gulp.task('pc', function () {
    gulp.src(pcFile)
        .pipe(uglify())
        .pipe(concat('lrz.pc.min.js'))
        .pipe(gulp.dest(paths.dist));
});

// pc
gulp.task('mobile', function () {
    gulp.src(mobileFile)
        .pipe(uglify())
        .pipe(concat('lrz.mobile.min.js'))
        .pipe(gulp.dest(paths.dist));
});

// 清洁工作
gulp.task('clean', function () {
    gulp.src(paths.dist)
        .pipe(clean({force: true}));
});

// 更新缓存
gulp.task('hash', function () {
    gulp.src('./**/*.html')
        .pipe(staticHash({asset: 'static'}))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['clean', 'hash', 'pc', 'mobile']);