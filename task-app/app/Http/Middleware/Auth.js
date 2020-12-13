const AuthService = require('../../Services/AuthService');
const { responseError } = require('../../lib/helper');

module.exports = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization').replace('Bearer ', '');
    const authorized = await AuthService.authorized(accessToken);

    if (!authorized) {
      throw new Error();
    }

    req.accessToken = accessToken;
    req.user = authorized;

    next();
  } catch (error) {
    res.status(401).json(responseError(401, 'Permission denied'));
  }
};
