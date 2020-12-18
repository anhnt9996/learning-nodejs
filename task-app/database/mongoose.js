const mongoose = require('mongoose');
const { config } = require('../app/lib/helper');

exports.connect = async () => {
  try {
    const MONGOOSE_CONNECTED_STATE = 1;
    console.log('Connecting to DB');
    await mongoose.connect(
      `mongodb://${config('app.dbHost')}:${config('app.dbPort')}/${config(
        'app.dbName'
      )}`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );

    const readyState = await mongoose.connection.readyState;
    console.log('Connect completed');
    return readyState === MONGOOSE_CONNECTED_STATE;
  } catch (error) {
    console.log('Cannot connect to mongodb');
    return false;
  }
};
