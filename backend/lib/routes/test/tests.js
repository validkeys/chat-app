module.exports = [
  {
    method: "GET",
    path:   "/tests/test",
    handler: function(req, reply) {
      reply("GOTCHA!");
    }
  }
];