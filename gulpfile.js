var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    minifyCSS   = require('gulp-clean-css'),
    maps        = require('gulp-sourcemaps'),
    del         = require('del'),
    sass        = require('gulp-sass'),
    jshint      = require('gulp-jshint'),
    bSync       = require('browser-sync'),
    through     = require('through2'),
    prefix      = require('gulp-autoprefixer'),
    combiner    = require('stream-combiner2'),
    sourcemaps  = require('gulp-sourcemaps');

var isprod = false;

var arguments = require('yargs').argv;
var isprod = (arguments.env === 'prod');

var noop = function() {
    return through.obj();
};

var dev = function(task) {
    return isprod ? noop() : task;
};

var prod = function(task) {
    return isprod ? task : noop();
};

gulp.task('test', function() {
  return gulp.src(['scripts/**/*.js', '!scripts/vendor/**/*.js'])
    // .pipe(cached('hint'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

// concat, minify js
gulp.task("scripts", 
  gulp.series('test', function scriptsInternal() {
    return gulp.src([
        // 'js/jquery.js',
        'js/**/*.js',
        ])
    .pipe(dev(sourcemaps.init()))
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(dev(sourcemaps.write('.')))
    .pipe(gulp.dest('js'));
}));

// sass,  minify css
gulp.task('styles', function() {
  return gulp.src('scss/styles.scss')
    .pipe(dev(sourcemaps.init()))
    .pipe(sass())
    .pipe(prefix())
    .pipe(minifyCSS())
    .pipe(rename('styles.min.css'))
    .pipe(dev(sourcemaps.write('.')))
    .pipe(gulp.dest('css'));
});

// delete dist before a new build
gulp.task('clean', function() {
  return del(['dist', 'css/styles.min.css', 'css/styles.min.css.map', 'js/scripts.min.js', 'js/scripts.min.js.map']);
});

gulp.task('server', function(done) {
  if (!isprod) {
    bSync({
      server: {
        baseDir: ['./']
      }
    });
  }
  done();
});

gulp.task('watcher', function watcher(done) {
      if (!isprod) {
        gulp.watch(['js/**/*.js', '!js/vendor/**/*.js'], gulp.parallel('scripts'));
        gulp.watch('scss/**/*.scss', gulp.parallel('styles'));
        gulp.watch('./**/*', bSync.reload);
      }
      done();
    });

// run all tasks, copy assets to dist
gulp.task("default", 
  gulp.series('clean',
    gulp.parallel('styles', 'scripts'),
    'server',
    'watcher',
    function distribution() {
      if (isprod) {
        return gulp.src(["css/styles.min.css", "js/scripts.min.js", 'projects/*.html', 'index.html', "img/**"], { base: './' })
          .pipe(gulp.dest('dist'));
      }
    })
);
  
// use 'gulp' for dev env 
// use 'gulp --env=prod' for production