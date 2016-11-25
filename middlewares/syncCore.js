var ajax = require('./ajax');
var parseXml = require('xml2js').parseString;
var moment = require('moment');

var config = require('../utils/config');

var syncFromServer = function(server, next) {
  ajax.get(server, function(err, rawData) {
    if (err) {
      typeof next === 'function' && next(err, null);
    }

    parseXml(rawData, function(err, data) {
      if (err) {
        typeof next === 'function' && next(err, null);
      }

      typeof next === 'function' && next(err, data.timestamp.$.time);
    });
  });
};

module.exports = {
  now: function(req, res, next) {
    var utc = req.params.utc;

    syncFromServer(config.server, function(err, data) {
      if (err) {
        res.status(500).end(err);
      }

      res.status(200).json({
        time: moment.unix(parseInt(data) / 1000000).utcOffset(utc).format('MM/DD/YYYY HH:mm:ss')
      });
    })
  }
};
