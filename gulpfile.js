//modules
var gulp = require('gulp'),
	less = require('gulp-less'),
	concatCSS = require('gulp-concat-css'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	imagemMin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache');

//clear
gulp.task('clear', function(){
	return del.sync('dist');
});

//clear cache
gulp.task('clearCache', function(){
	return cache.clearAll();
});

gulp.task('img', function(){
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemMin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			une: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

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
		.pipe(autoprefixer({
			browsers: ['last 15 versions'],
			cascade: true
		}))
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


gulp.task('build',['clear','img','less','js-libs','js-common'], function(){
	var lessBuild = gulp.src('app/less/**/*.less')
		.pipe(gulp.dest('dist/less'));

	var cssBuild = gulp.src('app/css/**/*.css')
		.pipe(gulp.dest('dist/css'));

	var fontsBuild = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var jsBuild = gulp.src('app/js/**/*.js')
		.pipe(gulp.dest('dist/js'));

	var htmlBuild = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

});

//watch
gulp.task('watch', ['less', 'js-libs','js-common'], function(){
	gulp.watch('app/less/template/**/*.less', ['less']);
	gulp.watch('app/js/**/*.js', ['js-common']);
});

