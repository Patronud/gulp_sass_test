var gulp = require('gulp')
var plumber = require('gulp-plumber')
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var gulpsass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var browsersync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('gulp_sass_test/assets/sass/i.scss')
      .pipe(plumber({
      errorHandler: reportError
      }))

  //  .pipe(sourcemaps.init())
      .pipe(gulpsass())
      .pipe(cssnano())
  //  .pipe(sourcemaps.write())
    .pipe(gulp.dest('gulp_sass_test/build/css'));
  //  .pipe(browsersync.stream());
});
gulp.task('js', function(){
    return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    'gulp_sass_test/assets/js/main.js'
    ])
    .pipe(plumber({
      errorHandler: reportError
  }))
    //.pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('gulp_sass_test/build/js'));
});

gulp.task('image', function(){
  return gulp.src('gulp_sass_test/assets/image/*')
  .pipe(plumber({
          errorHandler: reportError
      }))
  .pipe(imagemin({optimizationlevel: 5}))
  .pipe(gulp.dest('gulp_sass_test/build/image'));
});

gulp.task('watch', function(){
  gulp.watch('gulp_sass_test/assets/sass/*.scss', ['sass'])
  gulp.watch('gulp_sass_test/assets/js/*.js', ['js'])
  gulp.watch('gulp_sass_test/assets/image/*', ['image'])
});

gulp.task('default', ['sass', 'js', 'watch', 'image']);
