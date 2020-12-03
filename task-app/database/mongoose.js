const mongoose = require('mongoose');

const ENV = {
  dbHost: '127.0.0.1',
  dbPort: '27017',
  dbName: 'task-app',
};

mongoose.connect(`mongodb://${ENV.dbHost}:${ENV.dbPort}/${ENV.dbName}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
