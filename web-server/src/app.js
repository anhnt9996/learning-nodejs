const express = require('express');
const hbs = require('hbs');
const path = require('path');

const geocoding = require('./geocoding');
const forecast = require('./forecast');

// Default variables
const PORT = 3000;
const ROOTDIR = path.join(__dirname, '../');

const app = express();
app.use(express.static(path.join(ROOTDIR, '/public')));

// View engine

app.set('view engine', 'hbs');
hbs.registerPartials(path.join(ROOTDIR, '/views/layouts'));
const viewConfig = (options) => {
  return { author: 'NT.Ace', ...options };
};

// Routes

app.get('', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: 'Address is required',
    });
  }

  geocoding.search(address, (response) => {
    const { result: location, placeName } = response;

    forecast.get(location, (response) => {
      res.send({
        ...response,
        location: placeName,
      });
    });
  });
});

app.get('/about', (req, res) => {
  res.render('about', viewConfig({ title: 'About' }));
});

app.get('*', (req, res) => {
  res.render('errors/http-errors', {
    title: '404 Not found',
    error: '404 Page not found',
    message:
      'The page you are looking for might have been removed had its name changed or is temporarily unavailable.',
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
