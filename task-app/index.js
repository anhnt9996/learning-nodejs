const express = require('express');

const bootstrap = require('./bootstrap/app');
const db = require('./database');

const { config } = require('./app/lib/helper');
const apiRouter = require('./routes/api');
const MaintenanceMode = require('./app/Http/Middleware/MaintenanceMode');

const startApp = () => {
  const PORT = config('app.port');

  const app = express();

  app.use(express.json());

  // Middleware
  app.use(MaintenanceMode);

  // Router
  app.use(`/api/v${config('app.apiVersion')}`, apiRouter);

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

(async () => {
  try {
    await bootstrap.init();
    await db.connect();

    startApp();
  } catch (error) {
    console.log(error.message);
    console.log('Failed to start application');
  }
})();
