module.exports = [
  {
    method: "GET",
    path:   "/",
    handler: function(req, reply) {
      reply({msg: "Hello from API"});
    }
  }
];