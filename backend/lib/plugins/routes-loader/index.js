// Automatically registers all routes in the routes directory
var glob  = require('glob');
var path  = require('path');

var routesPath = path.join(__dirname,'..','..','routes','**','*.js');

exports.register = function(server, options, next) {
  glob(routesPath, function(err, files) {
    files.forEach(function(file) {
      server.route(require(file));
    });
    next();
  });
};

exports.register.attributes = {
  name:     "IndexRoute",
  version:  "1.0.0"
};