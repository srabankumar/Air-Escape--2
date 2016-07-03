var gulp = require('gulp'),
    minify = require('gulp-minify'),
    browserSync = require('browser-sync').create();


gulp.task('browserSync',function(){
    browserSync.init({
        
        server:{
            baseDir : './'
        }
    })
    
})

gulp.task('minify',function(){
    return gulp.src('components/js/game.js')
           .pipe(minify())
           .pipe(gulp.dest('./'))
            .pipe(browserSync.reload({stream:true}));
    
    
})

gulp.task('watch',function(){
    gulp.watch('components/js/game.js',['minify']);
    gulp.watch('./*.html',browserSync.reload)
})

gulp.task('default',['minify','watch','browserSync']);