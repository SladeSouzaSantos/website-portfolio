var gulp = require('gulp');
var $ = require('gulp-load-plugins')({rename: {'gulp-rev-delete-original':'revdel', 'gulp-if': 'if'}});



/* Tasks base */
gulp.task('copy', function() {
    return gulp.src([
      'build-website/assets/img/**/*',
      'build-website/assets/fonts/**/*',
      'build-website/libs/**/*',
      'build-website/assets/json/**/*'
    ], {base: 'build-website'})
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist/', {read: false})
        .pipe($.clean());
});



/* Minificação */
gulp.task('minify-js', function() {
  return gulp.src('build-website/assets/js/**/*.js')
  .pipe($.babel({presets: ['@babel/env']}))
    .pipe($.uglify())
    .pipe(gulp.dest('dist/assets/js/'))
});

gulp.task('minify-css', function() {
  return gulp.src('build-website/**/*.css',{base: 'build-website'})
    .pipe($.cssnano({
        safe: true,
        mergeRules: false 
    }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('minify-html', function() {
  return gulp.src('build-website/**/*.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
});



/* Concatenação */
gulp.task('useref', function () {
    return gulp.src('build-website/**/*.html', {base: 'build-website'})
        .pipe($.useref())
        .pipe($.if('*.html', $.inlineSource({ compress: true })))
        .pipe($.if('*.html', $.htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            ignoreCustomFragments: [ /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/ ] // Evita quebra em códigos injetados
        })))
        /* JS: Configurado para ser mais tolerante com caracteres especiais */
        .pipe($.if('*.js', $.uglify({
            compress: {
                drop_console: true
            },
            output: {
                ascii_only: true // Evita erro com caracteres como o '+' do C++ ou símbolos de ícones
            }
        })))
        /* CSS: Desativando 'mergeRules' para evitar o erro de 'property 0 of undefined' */
        .pipe($.if('*.css', $.cssnano({
            safe: true,
            mergeRules: false, // OBRIGATÓRIO: Impede que o minificador tente reestruturar seletores complexos
            reduceIdents: false, // Evita que ele renomeie seus Keyframes de animação
            zindex: false        // Impede que ele altere a ordem dos seus z-index
        })))
        .pipe(gulp.dest('dist'));
});



/* Imagens */
gulp.task('imagemin', function() {
    return gulp.src('build-website/assets/img/**/*', {base: 'build-website'})
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        }))
        .pipe(gulp.dest('dist'));
});



/* Revisão de arquivos */
gulp.task('rev', function(){
  return gulp.src(['dist/assets/**/*.{css,js}'])
    .pipe($.rev())
    .pipe($.revdel())
    .pipe(gulp.dest('dist/assets/'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('dist/'))
})

gulp.task('revreplace', ['rev'], function(){
  return gulp.src(['dist/**/*.html', 'dist/**/*.css'])
    .pipe($.revReplace({
        manifest: gulp.src('dist/rev-manifest.json'),
        replaceInExtensions: ['.html', '.js', '.css']
    }))
    .pipe(gulp.dest('dist/'));
});



/* Alias */
gulp.task('minify', ['minify-js', 'minify-css', 'minify-html']);
gulp.task('build', $.sequence('copy', ['minify-js', 'minify-css', 'imagemin'], 'useref', 'revreplace'));
gulp.task('default', $.sequence('clean', 'copy', 'build'));