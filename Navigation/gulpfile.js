const gulp = require("gulp");
const less = require("gulp-less");
const runSequence = require('run-sequence');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');
const del = require('del');

const browserSync = require('browser-sync').create()//浏览器自动刷新
const reload = browserSync.reload

var env ={
	"dev": "src/",
	"test": "build/",
	"production": "dist/"
}

gulp.task("clear:css", function(){
	return del([env.test+"asset/style/**"])
})

gulp.task("clear:img", function(){
	return del([env.test+"asset/img/**"])
})

gulp.task("clear:tmpl", function(){
	return del([env.test+"*.html"])
})

gulp.task("clear:script", function(){
	return del([env.test+"asset/script/*.js"])
})


gulp.task("css",["clear:css","sprite"], function(){
	return gulp.src(env.dev+"asset/style/*.less")
	.pipe(less())
	.pipe(gulp.dest(env.test + "asset/style/"))
})

gulp.task("tmpl",["clear:tmpl"], function(){
	return gulp.src(env.dev+"*.html")
	.pipe(gulp.dest(env.test)) 
})

gulp.task("img", ["clear:img","sprite"],function(){
	return gulp.src(env.dev+"asset/img/*.png")
	.pipe(gulp.dest(env.test+"asset/img/"))
})

gulp.task("script", ["clear:script"],function(){
	return gulp.src(env.dev+"asset/script/*.js")
	.pipe(gulp.dest(env.test+"asset/script/"))
})

gulp.task("sprite",function(){
	var spriteData = gulp.src(env.dev+"asset/img/icon/*.png")
	.pipe(spritesmith({
		imgName: "sprite.png",
		cssName: "sprite.css",
		padding: 2,
		cssTemplate: '_config/handlebarsStr.css'//修改路径
	}))
	var imgData = spriteData.img.pipe(gulp.dest(env.test+"asset/img/"))
	var cssData = spriteData.css.pipe(gulp.dest(env.test+"asset/style/"))

	return merge(imgData,cssData);
})


gulp.task('build',["tmpl","sprite","css","img",'script']);

gulp.task("reload", function(done){
	reload();
	done();
})

gulp.task("default",["build"], function(){
	browserSync.init({
		server: env.test,
	})

	gulp.watch([env.dev+"asset/style/*.less"],function(e){
		runSequence("css","reload");
	})

	gulp.watch(env.dev+"*.html",function(){
		runSequence("tmpl","reload");
	})

	gulp.watch(env.dev+"asset/script/*.js",function(){
		runSequence("script","reload");
	})
})