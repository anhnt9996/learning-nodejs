const mongoose = require('mongoose');
const { config } = require('../app/lib/helper');

exports.connect = async () => {
  try {
    const database = config('database.connections.mongodb');
    const MONGOOSE_CONNECTED_STATE = 1;

    console.log('Connecting to DB');
    const uri = `mongodb://${database.host}:${database.port}/${database.database}`;

    await mongoose.connect(uri, {
      auth: {
        authSource: 'admin',
      },
      user: database.username,
      pass: database.password,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    const readyState = await mongoose.connection.readyState;
    console.log('Connect completed');
    return readyState === MONGOOSE_CONNECTED_STATE;
  } catch (error) {
    console.log('Cannot connect to mongodb');
    return false;
  }
};
