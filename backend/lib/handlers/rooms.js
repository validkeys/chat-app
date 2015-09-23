var _ = require('lodash');

module.exports = {

  index: function(req, reply) {
    var Room    = req.server.plugins.JSData.models.room;

    Room.findAll().then(function(rooms) {
      reply({ rooms: rooms });
    });
  },

  show: function(req, reply) {
    var Room    = req.server.plugins.JSData.models.room;

    Room.find(req.params.room_id)
      .then(function(room) {
        reply({ room: room });
      })
      .catch(function(e) {
        reply({ error: e });
      });
  },

  create: function(req, reply) {
    var Room = req.server.plugins.JSData.models.room;

    var room = Room.createInstance({name: "test"});
    reply(Object.keys(room));
    // room.save()
    //   .then(function(room) {
    //     reply({ room: room });
    //   })
    //   .catch(function(err) {
    //     reply({ error: err });
    //   })
  },

  _roomParams: function(payload) {
    return _.pick(payload, ['id','name']);
  }

};