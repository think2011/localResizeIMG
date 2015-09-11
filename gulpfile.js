var gulp          = require('gulp');
var plugins       = require('gulp-load-plugins')();
var webpackConfig = require('./webpack.config');
var packageJSON   = require('./package.json');
var webpack       = require("webpack");

var paths = {
    src : './src',
    dist: './dist',
    test: './test'
};

var files = {
    js  : [paths.src + "/**/*.js"],
    txt : [paths.src + "/**/*.txt"],
    html: paths.test + '/**/*.html'
};

// 默认
gulp.task('default', ['clean'], function () {
    gulp.start('watch');
});

// 开发
gulp.task('dev', function () {
    gulp.start([
        'dev:js'
    ]);
});

// 发布
gulp.task('build', ['clean'], function () {
    gulp.start([
        'build:js',
        'build:html',
        'build:copy'
    ]);
});


// 监听
gulp.task('watch', ['dev'], function () {
    gulp.watch(files.js, ['dev:js']);
});

// 清洁
gulp.task('clean', function () {
    return gulp.src(paths.dist)
        .pipe(plugins.clean({force: true}));
});

gulp.task('dev:js', function () {
    //webpackConfig.devtool = ['source-map'];

    return gulp.src(files.js)
        .pipe(plugins.webpack(webpackConfig))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build:js', function () {
    webpackConfig.devtool = ['source-map'];
    webpackConfig.plugins = [
        new webpack.optimize.UglifyJsPlugin({
            compress : {
                warnings: false
            },
            output   : {
                comments  : false,
                semicolons: true
            },
            sourceMap: true
        })
    ];

    return gulp.src(paths.src + "/lrz.js")
        .pipe(plugins.webpack(webpackConfig))
        .pipe(plugins.replace(/__packageJSON\.version__/g, packageJSON.version))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build:html', ['build:js'], function () {
    return gulp.src(files.html)
        .pipe(plugins.staticHash({asset: paths.dist}))
        .pipe(gulp.dest(paths.test));
});

gulp.task('build:copy', function () {
    return gulp.src(files.txt)
        .pipe(gulp.dest(paths.dist));
});
