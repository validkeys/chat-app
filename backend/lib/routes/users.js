var handler = require('../handlers/users');

module.exports = [
  {
    method: "GET",
    path:   "/users",
    config: {
      handler: handler.index,
      bind:    handler
    }
  },

  {
    method: "GET",
    path:   "/users/{user_id}",
    config: {
      handler:  handler.show,
      bind:     handler
    }
  }
];