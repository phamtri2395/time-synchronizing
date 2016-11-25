var router = require('express').Router();

var syncCore = require('./syncCore');
var config = require('../utils/config')

var port = process.env.PORT;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Time Synchronizing', port: port || config.defaultPort });
});

router.get('/now/:utc', syncCore.now);

module.exports = router;
