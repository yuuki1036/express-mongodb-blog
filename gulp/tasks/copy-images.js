const config = require("../config.js");
const gulp = require("gulp");
const del = require("del");

gulp.task("copy-images.clean", () => {
  return del("./images/**/*", { cwd: config.path.output });
});

gulp.task("copy-images", ["copy-images.clean"], () => {
  gulp
    .src("./images/**/*", { cwd: config.path.input })
    .pipe(gulp.dest("./images", { cwd: config.path.output }));
});
