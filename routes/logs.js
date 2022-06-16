var express = require("express");
var router = express.Router();
var logs = require("../lib/file-system");

router.get("/", async function (req, res, next) {
  try {
    await logs.write({ method: "GET" });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
  res.status(200).send();
});

router.post("/", async function (req, res, next) {
  var body = req.body;
  try {
    await logs.write(body);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
