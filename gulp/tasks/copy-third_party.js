const config = require("../config.js");
const gulp = require("gulp");
const del = require("del");

gulp.task("copy-third_party.clean", () => {
  return del("./third_party/**/*", { cwd: config.path.output });
});

// jquery, popper.js, bootstrap, font-awesome
gulp.task("copy-third_party.jquery", ["copy-third_party.clean"], () => {
  gulp
    .src("./jquery/dist/**/*", { cwd: config.path.node_modules })
    .pipe(gulp.dest("./third_party/jquery", { cwd: config.path.output }));
});
gulp.task("copy-third_party.popper.js", ["copy-third_party.clean"], () => {
  gulp
    .src("./popper.js/dist/**/*", { cwd: config.path.node_modules })
    .pipe(gulp.dest("./third_party/popper.js", { cwd: config.path.output }));
});
gulp.task("copy-third_party.bootstrap", ["copy-third_party.clean"], () => {
  gulp
    .src("./bootstrap/dist/**/*", { cwd: config.path.node_modules })
    .pipe(gulp.dest("./third_party/bootstrap", { cwd: config.path.output }));
});
gulp.task("copy-third_party.font-awesome", ["copy-third_party.clean"], () => {
  gulp
    .src("./font-awesome/**/*", { cwd: config.path.node_modules })
    .pipe(gulp.dest("./third_party/font-awesome", { cwd: config.path.output }));
});

gulp.task("copy-third_party", [
  "copy-third_party.jquery",
  "copy-third_party.popper.js",
  "copy-third_party.bootstrap",
  "copy-third_party.font-awesome",
]);
