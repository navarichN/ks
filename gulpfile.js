const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');

// Компиляция less в CSS и минимизация
gulp.task('less', function () {
    return gulp.src('src/styles/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('dist/styles'));
});

// Копирование файлов из node_modules
gulp.task('copy', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('dist/node_modules/jquery/dist'));
});

// Отслеживание изменений (не включать в задачу по умолчанию)
gulp.task('watch', function () {
    gulp.watch('src/styles/*.less', gulp.series('less'));
    gulp.watch('*.html');
});

// Задача для сборки (без watch)
gulp.task('build', gulp.series('less', 'copy'));

// Задача по умолчанию (включает только сборку)
gulp.task('default', gulp.series('build'));
