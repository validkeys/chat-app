module.exports = [
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