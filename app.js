const express = require("express");
const app = express();

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

app.listen(3000);
