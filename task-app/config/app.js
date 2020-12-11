const app = {
  apiVersion: process.env.API_VERSION || 1,
  port: process.env.PORT || 3000,
  saltLength: process.env.SALT || 8,
  maintenanceMode: process.env.NODE_MAINTENANCE_MODE || 'off',
  dbHost: '127.0.0.1',
  dbPort: '27017',
  dbName: 'task-app',
};

module.exports = app;
