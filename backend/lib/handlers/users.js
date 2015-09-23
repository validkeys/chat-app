module.exports = {

  index: function(req, reply) {
    var User    = req.server.plugins.JSData.models.user;

    User.findAll().then(function(users) {
      reply({ users: users });
    });
  },

  show: function(req, reply) {
    var User    = req.server.plugins.JSData.models.user;

    User.find(req.params.user_id)
      .then(function(user) {
        reply({ user: user });
      })
      .catch(function(e) {
        reply({ error: e });
      });
  }

};