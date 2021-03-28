const config = require("../config.js");
const gulp = require("gulp");
const del = require("del");

gulp.task("clean-log", () => {
  return del("./**/*", { cwd: config.path.log });
});
