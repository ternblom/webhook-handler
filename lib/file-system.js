var fs = require("fs");
var path = require("path");
var ROOT = path.resolve(__dirname, "..");
var LOGS_FOLDER = path.resolve(ROOT, "logs");

if (!fs.existsSync(LOGS_FOLDER)) fs.mkdirSync(LOGS_FOLDER);

module.exports = {
  write: function (data, logFile) {
    return new Promise(function (resolve, reject) {
      fs.appendFile(
        path.resolve(
          LOGS_FOLDER,
          typeof logFile === "undefined" ? "logs.txt" : logFile
        ),
        JSON.stringify(data) + "\r\n",
        function (err) {
          if (err) return reject(err);
          resolve(true);
        }
      );
    });
  },
  error: function (data) {
    return new Promise(function (resolve, reject) {
      fs.appendFile(
        path.resolve(LOGS_FOLDER, "errors.txt"),
        data + "\r\n" + "-----------------------" + "\r\n",
        function (err) {
          if (err) return reject(err);
          resolve(true);
        }
      );
    });
  },
};
