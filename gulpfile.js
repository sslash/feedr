var gulp = require('gulp');
var sass = require('gulp-sass');

var paths = {
  scripts: ['app/assets/scripts/**/*.js', '!app/assets/scripts/dist.js'],
  sass : 'app/assets/styles**/*.scss',
  images : 'app/assets/images/**/*',
  css : 'app/assets/styles/**/*.css',
  build : 'dist'
};

var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var del = require('del');
var runSequence = require('run-sequence');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// The reload method will inform all browsers about changed files
// and will either cause the browser to refresh,
// or inject the files where possible.
var reload = browserSync.reload;

gulp.task('jshint', function () {
  return gulp.src(paths.scripts)
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(paths.build + '/images'))
    .pipe(gulp.dest('app/images'))
    .pipe($.size({title: 'images'}));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function () {
  return gulp.src(['app/assets/*'])
    .pipe(gulp.dest(paths.build))
    .pipe($.size({title: 'copy'}));
});

// Compile Sass For Style Guide Components (app/styles/components)
gulp.task('styles:components', function () {
  return gulp.src('app/assets/styles/components/components.scss')
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: ['app/assets/styles/components']
    }))
    .on('error', console.error.bind(console))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('app/assets/styles/components'))
    .pipe($.size({title: 'styles:components'}));
});

// Compile All other Sass Files You
gulp.task('styles:scss', function () {
  return gulp.src([paths.sass, '!app/assets/styles/components/components.scss'])
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: ['app/assets/styles']
    }))
    .on('error', console.error.bind(console))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size({title: 'styles:scss'}));
});

// Automatically Prefix CSS
gulp.task('styles:css', function () {
  return gulp.src(paths.css)

    // By default it's only able to detect whether files in the stream changed.
    .pipe($.changed('app/styles'))

    // Parse CSS and add vendor-prefixed CSS properties
    // using the Can I Use database. Based on Autoprefixer
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('app/styles'))
    .pipe($.size({title: 'styles:css'}));
});

gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('app/assets/scripts/app.js')
        .pipe($.browserify({
          insertGlobals : true,
          debug : !process.env.production
        }))
        .pipe($.if(process.env.production, $.uglify({preserveComments: 'some'})))
        .pipe($.concat('dist.js'))
        .pipe(gulp.dest(paths.build + '/clientscripts'))
        .pipe(gulp.dest('app/clientscripts'))
});

// Scan hbs For Assets & Optimize Them
gulp.task('html', function () {
  return gulp.src('app/templates/layout.hbs')

    .pipe($.useref.assets({searchPath: '{.tmp,app/assets}'}))

    // Remove Any Unused CSS
    // Note: If not using the Style Guide, you can delete it from
    // the next line to only include styles your project uses.
    .pipe($.if('*.css', $.uncss({
      html: [
        'app/templates/layout.hbs',
        'app/assets/styleguide/index.html'
      ],
      // CSS Selectors for UnCSS to ignore
      ignore: [
        '.navdrawer-container.open',
        /.app-bar.open/
      ]
    })))
    // Concatenate And Minify Styles
    .pipe($.if('*.css', $.csso()))
    .pipe($.useref.restore())
    .pipe($.useref())
    // Update Production Style Guide Paths
    .pipe($.replace('components/components.css', 'components/main.min.css'))
    // Minify Any hbs
    .pipe($.if('*.hbs', $.minifyHtml()))
    // Output Files
    .pipe(gulp.dest(paths.build))
    .pipe($.size({title: 'html'}));
});

// Watch Files For Changes & Reload
gulp.task('serve', function () {
  browserSync({
    notify: false,
    proxy: 'localhost:3000'
  });

  gulp.watch(['app/templates/**/*.hbs'], reload);
  gulp.watch(['app/assets/styles/**/*.scss'], ['styles:components', 'styles:scss']);
  gulp.watch(['{.tmp,app/assets/}/styles/**/*.css'], ['styles:css', reload]);
  gulp.watch(['app/assets/scripts/**/*.js'], ['jshint', 'scripts', reload]);
  gulp.watch(['app/assets/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
  browserSync({
    notify: false,
    server: {
      baseDir: 'dist'
    }
  });
});


// Output Final CSS Styles
gulp.task('styles', ['styles:components', 'styles:scss', 'styles:css']);

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['sass']);
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence('styles', ['jshint', 'scripts', 'html', 'images', 'copy'], cb);
});
