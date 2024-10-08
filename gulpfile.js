import gulp from 'gulp';
import less from 'gulp-less';
import plumber from 'gulp-plumber';
import debug from 'gulp-debug';

// Compile LESS to CSS
gulp.task('less', function () {
    return gulp.src('src/styles/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(debug({title: 'LESS:'}))
        .pipe(gulp.dest('dist/styles'));
});

// Copy JS files from node_modules
gulp.task('copy-js', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(debug({title: 'Copy JS:'}))
        .pipe(gulp.dest('dist/node_modules/jquery/dist'));
});

// Copy custom JS files to dist
gulp.task('scripts', function () {
    return gulp.src('scripts/*.js')
        .pipe(debug({title: 'Scripts:'}))
        .pipe(gulp.dest('dist/scripts'));
});

// Copy HTML files to dist
gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(debug({title: 'HTML:'}))
        .pipe(gulp.dest('dist'));
});

// Copy images to dist
gulp.task('images', function () {
    return gulp.src('assets/images/**/*.{png,jpg,jpeg,gif,svg}', {encoding: false})
        .pipe(debug({title: 'Images:'}))
        .pipe(gulp.dest('dist/assets/images'));
});

// Copy other styles (e.g., normalize.css)
gulp.task('copy-styles', function () {
    return gulp.src('src/styles/normalize.css')
        .pipe(debug({title: 'Copy Styles:'}))
        .pipe(gulp.dest('dist/styles'));
});

// Watch for changes (do not include in default task)
gulp.task('watch', function () {
    gulp.watch('src/styles/*.less', gulp.series('less'));
    gulp.watch('*.html', gulp.series('html'));
    gulp.watch('assets/images/**/*.{png,jpg,jpeg,gif,svg}', gulp.series('images'));
    gulp.watch('scripts/*.js', gulp.series('scripts'));
});

// Build task (without watch)
gulp.task('build', gulp.series('less', 'copy-js', 'scripts', 'html', 'images', 'copy-styles'));

// Default task (includes only build)
gulp.task('default', gulp.series('build'));
