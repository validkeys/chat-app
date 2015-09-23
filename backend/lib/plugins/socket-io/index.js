var io;

exports.register = function(server, options, next) {
  io = require('socket.io')(server.listener);

  io.on('connection', function(socket) {
    console.log("Socket IO received a connection");

    socket.on('handshake', function(data) {
      console.log("Got handshake", data);
      socket.emit('enteredRoom', data);
    });

    socket.on('typing', function(data) {
      socket.broadcast.emit('userIsTyping', data);
    });
  });

  next();
};

exports.register.attributes = {
  name:     "Socket.IO",
  version:  "1.0.0"
};