var gulp = require('gulp')
var sass = require('gulp-ruby-sass')
var connect = require('gulp-connect')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var ngdoc = require('gulp-ngdocs')
var flatten = require('gulp-flatten')

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        port: 4000,
        livereload: true
    })
})

gulp.task('connectDocs', function() {
    connect.server({
        root: 'docs',
        port: 4001
    })
})

gulp.task('browserify', function() {
    return browserify('./app/app.js')
        .transform('require-globify')
        .transform('strictify')
        //.plugin('minifyify', {map: 'map.json', output:'map.json'})
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/js/'))
})

gulp.task('flatten', function() {
    gulp.src('./app/**/*.html')
        .pipe(flatten())
        .pipe(gulp.dest('./public'))
        .pipe(connect.reload())
})

gulp.task('sass', function() {
    return sass('./app/style.scss')
        .pipe(gulp.dest('./public/css/'))
        .pipe(connect.reload())
})

gulp.task('ngdoc', [], function() {
    return gulp.src(['./app/**/*.js', './app/**/*.ngdoc'])
        .pipe(ngdoc.process({
            html5Mode: false,
            startPage: '/api',
            title: "IFAC2017 DEV DOC",
        }))
        .pipe(gulp.dest('./docs'))
})

gulp.task('watch', function() {
    gulp.watch('./app/**/*.js', ['browserify'])
    gulp.watch('./app/**/*.html', ['flatten'])
    gulp.watch('./app/**/*.scss', ['sass'])
})

gulp.task('default', ['connect', 'connectDocs', 'watch', 'browserify', 'ngdoc', 'flatten', 'sass'])
