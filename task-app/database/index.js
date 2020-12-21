const { config, empty } = require('../app/lib/helper');
const Obj = require('../app/Helpers/Obj');
const mongoose = require('./mongoose');

const getConnection = () => {
  const connection = config('database.default');
  const connectionsInstance = {
    mongodb: mongoose,
  };

  return Obj.only(connectionsInstance, connection);
};

exports.connect = async () => {
  const connection = getConnection();

  if (empty(connection)) {
    throw new Error(`Cannot find connection ${config('database.default')}`);
  }

  return await connection.connect();
};
