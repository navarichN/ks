const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');

// Compile LESS to CSS
gulp.task('less', function () {
    return gulp.src('src/styles/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('dist/styles'));
});

// Copy files from node_modules
gulp.task('copy', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('dist/node_modules/jquery/dist'));
});

// Copy HTML files to dist
gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'));
});

// Watch for changes (do not include in default task)
gulp.task('watch', function () {
    gulp.watch('src/styles/*.less', gulp.series('less'));
    gulp.watch('*.html', gulp.series('html'));
});

// Build task (without watch)
gulp.task('build', gulp.series('less', 'copy', 'html'));

// Default task (includes only build)
gulp.task('default', gulp.series('build'));
