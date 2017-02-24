var gulp = require('gulp'),
	less = require('gulp-less'),
	concatCSS = require('gulp-concat-css'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename');


//template style task
gulp.task('less-template', function(){
	return gulp.src('app/less/template/template.less')
	.pipe(less())
	.pipe(cleanCSS('template.css'))
	.pipe(rename('template.min.css'))
	.pipe(gulp.dest('app/css'));
});

//admin style task

gulp.task('less-admin', function(){
	return gulp.src('app/less/admin/admin.less')
	.pipe(less())
	.pipe(cleanCSS('admin.css'))
	.pipe(rename('admin.min.css'))
	.pipe(gulp.dest('app/css'));
});



gulp.task('watch', ['less-template','less-admin'], function(){
	gulp.watch('app/less/template/**/*.less', ['less-template']);
	gulp.watch('app/less/admin/**/*.less', ['less-admin']);
});