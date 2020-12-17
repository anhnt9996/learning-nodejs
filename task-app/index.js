const express = require('express');

const bootstrap = require('./bootstrap/app');
const db = require('./database/mongoose');

const { config } = require('./app/lib/helper');
const apiRouter = require('./routes/api');
const MaintenanceMode = require('./app/Http/Middleware/MaintenanceMode');

(async () => {
  await bootstrap.init();
  const dbConnected = await db.connect();

  if (dbConnected) {
    const PORT = config('app.port');

    const app = express();

    app.use(express.json());

    // Middleware
    app.use(MaintenanceMode);

    // Router
    app.use(`/api/v${config('app.apiVersion')}`, apiRouter);

    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  }
})();
