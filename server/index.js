const path = require("path");
const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");

const indexRouter = require("./src/routes");

const PORT = 3000;
const app = express();

app.set("views", path.join(__dirname, "./src/views"));
app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cookieParser());

app.listen(PORT, () => {
  console.log("gogo");
});

app.use("/api", indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
