// Development Config
exports.development = [
  {
    adapter: 'js-data-rethinkdb',
    name:    'rethinkdb',
    settings: {
      host: 'localhost',
      db:   'chatapp',
    },
    default: true
  }
];

// Staging Config
exports.staging    = [];

// Production Config
exports.production = [];