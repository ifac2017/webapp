var gulp = require('gulp')
var sass = require('gulp-ruby-sass')
var connect = require('gulp-connect')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var ngdoc = require('gulp-ngdocs')
var options = {
    html5Mode: false,
    startPage: '/api',
    title: "IFAC2017 DEV DOC",
}

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        port: 4000
    })
})

gulp.task('connectDoc', function() {
    connect.server({
        root: 'docs',
        port: 4001
    })
})

gulp.task('browserify', function() {
    return browserify('./app/app.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./public/js/'))
})

gulp.task('sass', function() {
    return sass('./app/styles/style.scss')
        .pipe(gulp.dest('./public/css/'))
})

gulp.task('ngdoc', [], function() {
    return gulp.src(['app/**/*.js', 'app/**/*.ngdoc'])
        .pipe(ngdoc.process(options))
        .pipe(gulp.dest('./docs'));
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['browserify', 'ngdoc'])
    gulp.watch('app/**/*.ngdoc', ['ngdoc'])
    gulp.watch('app/styles/**/*.scss', ['sass'])
})

gulp.task('default', ['connect', 'connectDoc', 'watch', 'browserify', 'sass', 'ngdoc'])
