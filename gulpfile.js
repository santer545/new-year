/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    criticalCss = require('gulp-critical-css'),
    /*penthouse = require('penthouse'),*/
    inject = require('gulp-inject-string'),
    del = require('del'),
    replace = require('gulp-replace'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    sourcemaps = require('gulp-sourcemaps');

// Styles
gulp.task('styles', function() {
    return gulp.src('sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 7 version'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('penthouse', function() {
    penthouse({
        url: 'index.html', // страница вашего сайта
        css: 'dist/css/style.css', // файл со стилями
        width: 1280,
        height: 800
    }, function(err, criticalCss) {
        gulp.src('index.html')
            .pipe(inject.after('<!-- Critical CSS -->', '\n<style>\n' + criticalCss + '\n</style>'))
            .pipe(gulp.dest('dist'))
    });
});



gulp.task('html', function() {
    return gulp.src('./*.html')
        .pipe(gulp.dest('./dist/'));
});

// Local server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});


gulp.task('critical', () => {
    gulp.src('dist/style.css')
        .pipe(criticalCss())
        .pipe(gulp.dest('dist'))
});

// настройки путей к файлам
var rootDir = '.';
var sourceDir = rootDir + '/js';    // здесь хранятся все исходники
var destDir = rootDir + '/dist/js';        // здесь хранится все на выходе


// блок с настройками компонентов
var components = {
  scripts: {
    source: sourceDir + '/*.js',
    dest: destDir,
    watch: sourceDir + '/*.js',
    options: {
      paths: ['./node_modules', sourceDir],
      debug: false,
      fullPaths: true
    }
  }
};

// Scripts
gulp.task('scripts', function() {
    return gulp.src([
            sourceDir + '/jquery-2.2.1.min.js',
            sourceDir + '/bootstrap-select.js',
            sourceDir + '/jquery.maskedinput.min.js',
            sourceDir + '/jquery.sameheight.js',
            sourceDir + '/validate.js',
            sourceDir + '/bootstrap.min.js',
            sourceDir + '/jquery.mousewheel.js',
            sourceDir + '/css3-animate-it.js',
            sourceDir + '/svgfixer.js',
            sourceDir + '/svg.js',
            sourceDir + '/swiper.js',
            sourceDir + '/functions.newyear.js',
            sourceDir + '/main.js'
        ])

        //.pipe(browserify(components.scripts.options))
        .pipe(concat('all.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulp.dest(components.scripts.dest))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
    return gulp.src('images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images/'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
    return del(['dist/css', 'dist/js', 'dist/images']);
});

// Default task
gulp.task('default', function() {
    gulp.start('html', 'styles', 'scripts', 'images');
});

gulp.task('server', function() {
    gulp.start('default', 'watch', 'browser-sync');
});


// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('sass/**/*.scss', ['styles', browserSync.reload]);

    // Watch .js files
    gulp.watch('js/**/*.js', ['scripts', browserSync.reload]);

    // Watch image files
    gulp.watch('assets/images/**/*', ['images', browserSync.reload]);

    //gulp.watch('assets/svg/**/*', ['svgSprite', browserSync.reload]);
    gulp.watch('./*.html', ['html', browserSync.reload]);

});