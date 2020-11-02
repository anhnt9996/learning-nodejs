const request = require('request');

const accessToken =
  'pk.eyJ1IjoiZG9taW5vMDkwOSIsImEiOiJja2gwN2U0ZXYwNmxsMnlvcjFjZHZjMjUxIn0.Y9YbqZXPRlX9PpTWYuHgDQ';

const search = (searchText) => {
  const options = {
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json`,
    qs: {
      access_token: accessToken,
      limit: 1,
    },
  };

  let coordinates = {
    latitude: '',
    longitude: '',
  };
  request(options);

  return coordinates;
};

module.exports = {
  search,
};
