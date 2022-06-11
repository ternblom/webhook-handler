var express = require("express");
var router = express.Router();
var Twilio = require("twilio");
// credentials
var ACCOUNT_SID = process.env["ACCOUNT_SID"];
var AUTH_TOKEN = process.env["AUTH_TOKEN"];
var MY_TWILIO_NUMBER = process.env["MY_TWILIO_NUMBER"];
var TWILIO_VERIFY_SERVICE = process.env["TWILIO_VERIFY_SERVICE"];
// client
var client = new Twilio(ACCOUNT_SID, AUTH_TOKEN);
var logs = require("../lib/file-system");
var LOGS_FILE = "twilio.txt";

router.post("/verify", async function (req, res, next) {
  var body = req.body;
  var { number } = body;

  await logs.write({ method: "VERIFY" }, LOGS_FILE, LOGS_FILE);

  try {
    if (!(number + "").startsWith("+")) number = "+" + number;

    var result = await client.verify
      .services(TWILIO_VERIFY_SERVICE)
      .verifications.create({ to: number, channel: "whatsapp" });

    await logs.write(body, LOGS_FILE);
    await logs.write(result, LOGS_FILE);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
  res.status(206).send();
});

router.post("/message", async function (req, res, next) {
  var body = req.body;
  var { message, number } = body;

  await logs.write({ method: "MESSAGE" }, LOGS_FILE);

  try {
    if (!(number + "").startsWith("+")) number = "+" + number;

    var result = await client.messages.create({
      body: message,
      to: "whatsapp:" + number,
      from: MY_TWILIO_NUMBER,
    });

    await logs.write(body, LOGS_FILE);
    await logs.write(result, LOGS_FILE);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
  res.status(206).send();
});

module.exports = router;
