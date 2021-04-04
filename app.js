const systemlogger = require("./lib/log/sytemlogger");
const express = require("express");
const app = express();
const logger = require("./lib/log/logger.js").console;
app.set("view engine", "ejs");
app.disable("x-powered-by");

app.use(
  "/public",
  express.static(
    __dirname +
      "/public/" +
      (process.env.NODE_ENV === "development" ? "development" : "production")
  )
);

app.use("/", require("./routes/index"));
app.use(systemlogger());
app.listen(3000);
