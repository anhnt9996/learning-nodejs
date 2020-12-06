const express = require('express');

require('./database/mongoose');
const apiRouter = require('./routes/api');
const taskRouter = require('./routes/api/task');

const ENV = {
  API_VERSION: 1,
  PORT: 3000,
};

const app = express();
const PORT = process.env.PORT || ENV.PORT;

app.use(express.json());

// Router
app.use(`/api/v${ENV.API_VERSION}/tasks`, taskRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
