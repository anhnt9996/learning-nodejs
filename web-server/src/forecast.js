const request = require('request');

const accessKey = '476077e57ffd74ed1dba0a6ecef96208';

const get = (location, callback) => {
  const options = {
    url: 'http://api.weatherstack.com/current',
    json: true,
    qs: {
      query: location,
      access_key: accessKey,
    },
  };

  request(options, (error, response, body) => {
    const current = body.current;

    callback({
      current: {
        temperature: current.temperature,
        feelslike: current.feelslike,
      },
    });
  });
};

module.exports = {
  get,
};
