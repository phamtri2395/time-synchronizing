var http = require("http");

exports.get = function(server, next) {
  var options = {
    host: server.host,
    path: server.path
  };

  var req = http.get(options, function(res) {
    var bodyChunks = [];

    res.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);

      typeof next === 'function' && next(null, body);
    });
  });

  req.on('error', function(error) {
    typeof next === 'function' && next(error, null);
  });
};
