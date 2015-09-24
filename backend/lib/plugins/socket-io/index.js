var io;

exports.register = function(server, options, next) {

  var JSData  = server.plugins.JSData;
  var r     = JSData.adapters.rethinkdb.r;



  io = require('socket.io')(server.listener);

  io.on('connection', function(socket) {
    console.log("Socket IO received a connection");
  });

  r.db('chatapp').table('message')
    .changes()
    .run()
    .then(function(feed) {
      feed.each(function(err, item) {
        setTimeout(function(){
          if (item.old_val && item.new_val) { //update
            io.sockets.emit("db", { type: "message", action: "update", payload: item.new_val });
          } else if (item.new_val && !item.old_val) { //insert
            io.sockets.emit("db", { type: "message", action: "create", payload: item.new_val });
          } else if (!item.new_val && item.old_val) { //delete
            io.sockets.emit("db", { type: "message", action: "destroy", payload: item.old_val });
          }
        }, 50);
      });
    });

  r.db('chatapp').table('room')
    .changes()
    .run()
    .then(function(feed) {
      feed.each(function(err, item) {
        setTimeout(function(){
          if (item.old_val && item.new_val) { //update
            io.sockets.emit("db", { type: "room", action: "update", payload: item.new_val });
          } else if (item.new_val && !item.old_val) { //insert
            io.sockets.emit("db", { type: "room", action: "create", payload: item.new_val });
          } else if (!item.new_val && item.old_val) { //delete
            io.sockets.emit("db", { type: "room", action: "destroy", payload: item.old_val });
          }
        }, 50);
      });
    });

  next();
};

exports.register.attributes = {
  name:         "Socket.IO",
  version:      "1.0.0",
  dependencies: ['JSData']
};