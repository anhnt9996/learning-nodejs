const { responseError } = require('../../lib/helper');

exports.MaintenanceMode = (req, res, next) => {
  const maintenanceMode = process.env.NODE_MAINTENANCE_MODE || 'off';

  if (maintenanceMode === 'on') {
    return res.status(503).json(responseError(503, 'Under maintenance!'));
  }

  next();
};
