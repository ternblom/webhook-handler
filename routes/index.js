var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.jsonp({ version: 'API v.0.0.1' });
});

module.exports = router;
