var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var logs = require("./lib/file-system");

var indexRouter = require("./routes/index");
var logsRouter = require("./routes/logs");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", indexRouter);
app.use("/api/v1/logs", logsRouter);

app.use(function (err, req, res, next) {
  logs.error(err.stack);
  next(err);
});

app.use(function (err, req, res, next) {
  if (req.xhr) return res.status(500).send();
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(500);
  res.jsonp({ error: err });
});

module.exports = app;
