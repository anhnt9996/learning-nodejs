const { responseError, config } = require('../../lib/helper');

module.exports = (req, res, next) => {
  const maintenanceMode = config('app.maintenanceMode');

  if (maintenanceMode === 'on') {
    return res.status(503).json(responseError(503, 'Under maintenance!'));
  }

  next();
};
