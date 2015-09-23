var handler = require('../handlers/rooms');

module.exports = [
  {
    method: "GET",
    path:   "/rooms",
    config: {
      handler: handler.index,
      bind:    handler
    }
  },

  {
    method: "GET",
    path:   "/rooms/{room_id}",
    config: {
      handler:  handler.show,
      bind:     handler
    }
  },

  {
    method: "POST",
    path:   "/rooms",
    config: {
      handler:  handler.create,
      bind:     handler
    }
  }
];