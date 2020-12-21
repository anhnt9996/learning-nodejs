const { env } = require('../app/lib/helper');

const database = {
  default: env('DB_CONNECTION', 'mongodb'),
  connections: {
    mongodb: {
      host: env('DB_HOST', 'localhost'),
      port: env('DB_PORT', 27017),
      database: env('DB_DATABASE', ''),
      username: env('DB_USERNAME', ''),
      password: env('DB_PASSWORD', ''),
    },
  },
};

module.exports = database;
