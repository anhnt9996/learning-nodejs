const request = require('request');
const search = require('./geocoding');

const geocoding = require('./geocoding');

console.log(geocoding.search('Viet Nam'));

// const accessKey = '476077e57ffd74ed1dba0a6ecef96208';

// const options = {
//   url: 'http://api.weatherstack.com/current',
//   json: true,
//   qs: {
//     query: 'Ha Noi',
//     access_key: accessKey,
//   },
// };

// request(options, (error, response, body) => {
//   const current = body.current;
//   console.log(current);
//   console.log(
//     `It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`
//   );
// });
