const gulp = require('gulp');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const wait = require('gulp-wait');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const server = require('gulp-server-livereload');
const runSequence = require('run-sequence');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

let src = 'app';
let dest = 'dist';

gulp.task('clean', function() {
  return del( dest );
});

gulp.task('copy', function() {
  gulp
    .src([
      src + '/index.html',
      src + '/favicon.ico',
      src + '/css*/**/*',
      src + '/libs*/**/*',
      src + '/files*/**/*',
      src + '/images*/**/*'
    ])
    .pipe(gulp.dest('./' + dest));
});

gulp.task('scripts', function() {
    return gulp.src( src + '/js/scripts.js' )
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./' + dest + '/js'));
});

gulp.task('styles', function () {
    return gulp
      .src(src + '/scss/styles.scss')
      .pipe(sourcemaps.init())
      .pipe(wait(250))
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dest + '/css'));
});

gulp.task('watch', ['copy', 'scripts', 'styles'], function() {
    gulp.watch( src + '/*.html', ['copy'] );
    gulp.watch(src + '/**/*.{jpg,png,gif,svg}', ['copy'] );
    gulp.watch( src + '/js/*.js', ['scripts'] );
    gulp.watch( src + '/scss/**/*.scss', ['styles'] );
});

gulp.task('serve', function(callback) {
  runSequence('clean', ['copy', 'watch'], 'webserver', callback);
})

gulp.task('webserver', function() {
  gulp.src( dest ).pipe(
    server({
      livereload: true,
      open: true,
      port: 3000
    })
  );
});

gulp.task('build', ['copy', 'scripts', 'styles'], function() {
  gulp.src(src + '/*.html', ['copy']);
  gulp.src(src + '/js/*.js', ['scripts']);
  gulp.src(src + '/scss/*.scss', ['styles']);
});
