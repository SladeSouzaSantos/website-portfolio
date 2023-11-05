var gulp = require('gulp');
var $ = require('gulp-load-plugins')({rename: {'gulp-rev-delete-original':'revdel', 'gulp-if': 'if'}});



/* Tasks base */
gulp.task('copy', function() {
    return gulp.src(['build-website/assets/{img,font}/**/*', 'build-website/libs/**/*','build-website/assets/json/**/*'], {base: 'build-website'})
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist/', {read: false})
        .pipe($.clean());
});



/* Minificação */
gulp.task('minify-js', function() {
  return gulp.src('build-website/assets/js/*.js')
  .pipe($.babel({presets: ['@babel/env']}))
    .pipe($.uglify())
    .pipe(gulp.dest('dist/assets/js/'))
});

gulp.task('minify-css', function() {
  return gulp.src('build-website/**/*.css')
    .pipe($.cssnano({safe: true}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('minify-html', function() {
  return gulp.src('build-website/**/*.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
});



/* Concatenação */
gulp.task('useref', function () {
    return gulp.src('build-website/index.html')
        .pipe($.useref())
        .pipe($.if('*.html', $.inlineSource()))
        .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssnano({safe: true})))
        .pipe(gulp.dest('dist'));
});



/* Imagens */
gulp.task('imagemin', function() {
    return gulp.src('build-website/assets/img/*')
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        }))
        .pipe(gulp.dest('dist/assets/img'));
});



/* Revisão de arquivos */
gulp.task('rev', function(){
  return gulp.src(['dist/assets/**/*.{css,js,json}'])
    .pipe($.rev())
    .pipe($.revdel())
    .pipe(gulp.dest('dist/assets/'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('dist/'))
})

gulp.task('revreplace', ['rev'], function(){
  return gulp.src(['dist/index.html', 'dist/**/*.css'])
    .pipe($.revReplace({
        manifest: gulp.src('dist/rev-manifest.json'),
        replaceInExtensions: ['.html', '.json', '.js', '.css']
    }))
    .pipe(gulp.dest('dist/'));
});



/* Alias */
gulp.task('minify', ['minify-js', 'minify-css', 'minify-html']);
gulp.task('build', $.sequence(['minify-js', 'minify-css', 'imagemin'], 'useref', 'revreplace'));
gulp.task('default', $.sequence('clean', 'copy', 'build'));