import gulp from "gulp";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import uglify from "gulp-uglify";

export const minifyCss = () => {
  return gulp
    .src("src/css/*.css")
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"));
};

export const minifyJs = () => {
  return gulp
    .src("src/js/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/js"));
};

gulp.task("minify-css", minifyCss);
gulp.task("minify-js", minifyJs);

export default gulp.parallel(minifyCss, minifyJs);
