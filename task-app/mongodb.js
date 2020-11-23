const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const ENV = {
  dbHost: '127.0.0.1',
  dbPort: '27017',
  dbName: 'task-app',
};

const connection = `mongodb://${ENV.dbHost}:${ENV.dbPort}`;

MongoClient.connect(connection, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to mongodb');
  }

  const db = client.db(ENV.dbName);

  db.collection('users').insertOne({
    name: 'NT.Ace',
    age: 25,
  });
});
