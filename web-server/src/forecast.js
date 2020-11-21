const request = require('request');

const accessKey = '476077e57ffd74ed1dba0a6ecef96208';

const get = (location, callback) => {
  console.log('asda');
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
      forecast: `It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`,
    });
  });
};

module.exports = {
  get,
};
