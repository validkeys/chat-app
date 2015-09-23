var hapi    = require('hapi');
var server  = new hapi.Server();

server.connection({ port: 3000 });

server.register([
  require('./plugins/routes-loader'),
  require('./plugins/js-data')
], function(err) {

  if (err) {
    return console.log("Error registering plugins", err);
  }

  server.start(function(err) {

    if (err) {
      console.log("ERROR starting server", err);
    }

    console.log("Hapi listening on port: " + server.info.port);
  });
});