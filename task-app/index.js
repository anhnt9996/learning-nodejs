const express = require('express');

const bootstrap = require('./bootstrap/app');
const db = require('./database/mongoose');

const { config, responseError } = require('./app/lib/helper');
const apiRouter = require('./routes/api');

(async () => {
  await bootstrap.init();
  await db.init();

  const PORT = config('app.port');

  const app = express();

  app.use((req, res, next) => {
    const maintenanceMode = process.env.NODE_MAINTENANCE_MODE || 'off';

    if (maintenanceMode === 'on') {
      return res.status(503).json(responseError(503, 'Under maintenance!'));
    }

    next();
  });

  app.use(express.json());

  // Router
  app.use(`/api/v${config('app.apiVersion')}`, apiRouter);

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
})();
