const express = require('express');

require('./database/mongoose');
const { config } = require('./app/lib/helper');

const apiRouter = require('./routes/api');

const app = express();
const PORT = 3000;

app.use(express.json());

// Router
app.use(`/api/v${config('app.apiVersion')}`, apiRouter);

app.listen(PORT, () => console.log(`Listening on port ${config('app.port')}`));
