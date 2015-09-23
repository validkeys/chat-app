var handler = require('../handlers/index');

module.exports = [
  {
    method: "GET",
    path:   "/",
    config: {
      handler: handler.index,
      bind:    handler
    }
  }
];