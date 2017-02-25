//modules
var gulp = require('gulp'),
	less = require('gulp-less'),
	concatCSS = require('gulp-concat-css'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

//less
gulp.task('less', function(){
	var styles = [
		'app/less/admin/admin.less',
		'app/less/template/template.less',
		'app/less/libs.less'
	];

	styles.forEach(function(item){
		gulp.src(item)
		.pipe(less())
		.pipe(cleanCSS())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest('app/css'));
	});
});

// js library
gulp.task('js-libs', function(){

	var jsLibs = gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/bootstrap/bootstrap.min.js',
		'app/libs/angular/angular.min.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

//js common 
gulp.task('js-common', function(){
	var jsCommon = gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
		.pipe(concat('common.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['less', 'js-libs','js-common'], function(){
	gulp.watch('app/less/template/**/*.less', ['less']);
	gulp.watch('app/js/**/*.js', ['js-common']);
});