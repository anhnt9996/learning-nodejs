const request = require('request');

const accessToken =
  'pk.eyJ1IjoiZG9taW5vMDkwOSIsImEiOiJja2gwN2U0ZXYwNmxsMnlvcjFjZHZjMjUxIn0.Y9YbqZXPRlX9PpTWYuHgDQ';

const search = (searchText, callback) => {
  const options = {
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json`,
    qs: {
      access_token: accessToken,
      limit: 1,
    },
    json: true,
  };

  request(options, (error, res, body) => {
    if (!body.features[0]) {
      return callback({
        error: true,
        message: 'Unable to find location!',
      });
    }

    const location = body.features[0].center;
    const result = `${location[1]},${location[0]}`;

    callback({
      result,
      placeName: body.features[0].place_name,
    });
  });
};

module.exports = {
  search,
};
