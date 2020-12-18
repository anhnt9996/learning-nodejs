const { env } = require('../app/lib/helper');

const app = {
  apiVersion: env('APP_API_VERSION', 1),
  port: env('APP_PORT', 3000),
  saltLength: 8,
  maintenanceMode: env('APP_MAINTENANCE_MODE', 'off'),
  dbHost: env('DB_HOST'),
  dbPort: env('DB_PORT'),
  dbName: env('DB_DATABASE'),
  paginate: {
    limit: 15,
    skip: 0,
  },
};

module.exports = app;
