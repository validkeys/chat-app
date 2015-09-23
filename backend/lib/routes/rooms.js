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
  },

  {
    method: "PUT",
    path:   "/rooms/{room_id}",
    config: {
      handler:  handler.update,
      bind:     handler
    }
  },

  {
    method: "DELETE",
    path:   "/rooms/{room_id}",
    config: {
      handler:  handler.destroy,
      bind:     handler
    }
  }
];