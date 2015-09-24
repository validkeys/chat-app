var _ = require('lodash');

module.exports = {

  index: function(req, reply) {
    var Message    = req.server.plugins.JSData.models.message;

    if (!req.query.roomId) {
      return reply({ error: "You must request a roomId!" });
    }

    var filterParams = {
      roomId: req.query.roomId
    };

    Message
      .findAll(filterParams)
      .then(function(messages) {
        reply({ messages: messages });
      })
      .catch(function(err) {
        reply({ error: err });
      });
  },

  show: function(req, reply) {
    var Message    = req.server.plugins.JSData.models.message;

    Message.find(req.params.message_id)
      .then(function(message) {
        reply({ message: message });
      })
      .catch(function(e) {
        reply({ error: e });
      });
  },

  create: function(req, reply) {
    var Message = req.server.plugins.JSData.models.message;
    var message = Message.createInstance(this._messageParams(req.payload.message));

    message.DSCreate()
      .then(function(newMessage) {
        reply({ message: newMessage })
      })
      .catch(function(e) {
        reply({err: e});
      });
  },

  update: function(req, reply) {


    var Message     = req.server.plugins.JSData.models.message;
    var params      = this._messageParams(req.payload.message);

    Message.find(req.params.message_id)
      .then(function(message) {
        console.log(message);
        return message.DSUpdate(params);
      })
      .then(function(updatedMessage) {
        reply({ message: updatedMessage });
      })
      .catch(function(e) {
        reply({ err: e });
      });
  },

  destroy: function(req, reply) {
    var Message    = req.server.plugins.JSData.models.message;

    Message.find(req.params.message_id)
      .then(function(message) {
        console.log(message);
        return message.DSDestroy();
      })
      .then(function() {
        reply({});
      })
      .catch(function(e) {
        reply({ err: e });
      })
  },

  _messageParams: function(payload) {
    return _.pick(payload, ['id','roomId','content']);
  }

};