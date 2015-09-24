var handler = require('../handlers/messages');

module.exports = [
  {
    method: "GET",
    path:   "/messages",
    config: {
      handler: handler.index,
      bind:    handler
    }
  },

  {
    method: "GET",
    path:   "/messages/{message_id}",
    config: {
      handler:  handler.show,
      bind:     handler
    }
  },

  {
    method: "POST",
    path:   "/messages",
    config: {
      handler:  handler.create,
      bind:     handler
    }
  },

  {
    method: "PUT",
    path:   "/messages/{message_id}",
    config: {
      handler:  handler.update,
      bind:     handler
    }
  },

  {
    method: "DELETE",
    path:   "/messages/{message_id}",
    config: {
      handler:  handler.destroy,
      bind:     handler
    }
  }
];