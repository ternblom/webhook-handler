var express = require("express");
var router = express.Router();
var path = require("path");
var logs = require("../lib/file-system");
var ROOT = path.resolve(__dirname, "..");

router.get("/", async function (req, res, next) {
  try {
    await logs.write({ method: "GET" });
    res.status(206).send();
  } catch (error) {
    next(error);
  }
  res.status(206).send();
});

router.post("/", async function (req, res, next) {
  var body = req.body;
  try {
    await logs.write(body);
    res.status(206).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
