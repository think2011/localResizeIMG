pkg         = require './package.json'
gulp        = require 'gulp'
watch       = require 'gulp-watch'
clean       = require 'gulp-clean'
plumber     = require 'gulp-plumber'
webserver   = require 'gulp-webserver'
coffee      = require 'gulp-coffee'
concat      = require 'gulp-concat'
uglify      = require 'gulp-uglify'
minifyCSS   = require 'gulp-minify-css'
minifyHtml  = require 'gulp-minify-html'
rename      = require 'gulp-rename'
header      = require 'gulp-header'
gulpFilter  = require  'gulp-filter'
sourcemaps  = require 'gulp-sourcemaps'
runSequence = require 'run-sequence'


# 路径
paths = 
  dest  : 'dist'
  src   : 'src'
  build : 'build'

# 文件类型
files =
  coffee: "#{paths.src}/**/*.coffee"
  js    : "#{paths.src}/**/*.js"
  html  : "#{paths.src}/**/*.html"
  css   : "#{paths.src}/**/*.css"
  jpg   : "#{paths.src}/**/*.jpg"
  png   : "#{paths.src}/**/*.png"
  gif   : "#{paths.src}/**/*.gif"
  eot   : "#{paths.src}/**/*.eot"
  svg   : "#{paths.src}/**/*.svg"
  ttf   : "#{paths.src}/**/*.ttf"
  woff  : "#{paths.src}/**/*.woff"
  otf   : "#{paths.src}/**/*.otf"


# 过滤的文件
cssFilter = gulpFilter '**/*.css'


# 开发模式-默认
gulp.task 'default', ->
  runSequence 'clean', 'copy', 'css', 'html', 'coffee', 'webserver', 'watch'


# 生成发布
gulp.task 'build', ->
  runSequence 'clean', 'copy', 'css', 'html', 'coffee', 'build-copy', 'build-angular', 'build-angular-mobile', 'clean'


gulp.task 'build-copy', ->
  gulp.src [
    files.css
    files.jpg
    files.png
    files.gif
    files.eot
    files.svg
    files.ttf
    files.woff
    files.otf
  ]
  .pipe cssFilter
  .pipe minifyCSS()
  .pipe cssFilter.restore()
  .pipe gulp.dest paths.build


# build-angular-mobile
gulp.task 'build-angular-mobile', ->
  gulp.src [
    "#{paths.dest}/libs/mobileBUGFix.mini.js"
    "#{paths.dest}/localResize.ui.js"
    "#{paths.dest}/localResize.js"
    "#{paths.dest}/localResize.angular.js"
  ]
  .pipe uglify()
  .pipe concat 'all.js'
  .pipe rename 'localResize.angular.mobile.min.js'
  .pipe header """
              /**
                @Name     ：localResize.angular.mobile for angular
                @version  : #{pkg.version}
                @Date     ：#{Date()}
                @Blog     ：think2011.github.io
                @Author   ：#{pkg.author}
                @Copyright：#{pkg.author}
              **/ \n
               """
  .pipe gulp.dest paths.build


# build-angular
gulp.task 'build-angular', ->
  gulp.src [
    "#{paths.dest}/localResize.ui.js"
    "#{paths.dest}/localResize.js"
    "#{paths.dest}/localResize.angular.js"
  ]
  .pipe uglify()
  .pipe concat 'all.js'
  .pipe rename 'localResize.angular.min.js'
  .pipe header """
              /**
                @Name     ：localResize.angular for angular
                @version  : #{pkg.version}
                @Date     ：#{Date()}
                @Blog     ：think2011.github.io
                @Author   ：#{pkg.author}
                @Copyright：#{pkg.author}
              **/ \n
               """
  .pipe gulp.dest paths.build


gulp.task 'webserver', ->
  gulp.src paths.dest
  .pipe webserver
    host            : '0.0.0.0'
    port            : 1991
    livereload      : true
    open            : false
    directoryListing: {enable:true, path: paths.dest}


gulp.task 'watch', ->
  watch files.coffee, -> gulp.start 'coffee'
  watch files.html, -> gulp.start 'html'
  watch files.css, -> gulp.start 'css'


gulp.task 'clean', ->
  gulp.src paths.dest
  .pipe clean force: true


gulp.task 'copy', ->
  gulp.src [
    files.js
    files.jpg
    files.png
    files.gif
    files.eot
    files.svg
    files.ttf
    files.woff
    files.otf
  ]
  .pipe gulp.dest paths.dest


gulp.task 'coffee', ->
  gulp.src files.coffee
  .pipe plumber()
  .pipe sourcemaps.init()
  .pipe coffee()
  .pipe sourcemaps.write './'
  .pipe gulp.dest paths.dest


gulp.task 'html', ->
  gulp.src files.html
  .pipe gulp.dest paths.dest


gulp.task 'css', ->
  gulp.src files.css
  .pipe gulp.dest paths.dest

