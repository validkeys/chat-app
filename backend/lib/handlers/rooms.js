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
    var room = Room.createInstance(this._roomParams(req.payload.room));

    // Room.create(this._roomParams(req.payload.room))
    // or
    // room.DSCreate()

    room.DSCreate()
      .then(function(newRoom) {
        reply({ room: newRoom })
      })
      .catch(function(e) {
        reply({err: e});
      });
  },

  update: function(req, reply) {
    var Room    = req.server.plugins.JSData.models.room;
    var params  = this._roomParams(req.payload.room);

    Room.find(req.params.room_id)
      .then(function(room) {
        return room.DSUpdate(params);
      })
      .then(function(updatedRoom) {
        reply({ room: updatedRoom });
      })
      .catch(function(e) {
        reply({ err: e });
      });
  },

  destroy: function(req, reply) {
    var Room    = req.server.plugins.JSData.models.room;

    Room.find(req.params.room_id)
      .then(function(room) {
        return room.DSDestroy();
      })
      .then(function() {
        reply({});
      })
      .catch(function(e) {
        reply({ err: e });
      })
  },

  _roomParams: function(payload) {
    return _.pick(payload, ['id','name']);
  }

};