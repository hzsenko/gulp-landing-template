var gulp = require('gulp'),
	less = require('gulp-less'),
	concatCSS = require('gulp-concat-css'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');


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

// js library
gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/bootstrap/bootstrap.min.js',
		'app/libs/angular/angular.min.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});



gulp.task('watch', ['less-template','less-admin','scripts'], function(){
	gulp.watch('app/less/template/**/*.less', ['less-template']);
	gulp.watch('app/less/admin/**/*.less', ['less-admin']);
});