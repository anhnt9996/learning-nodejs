const jwt = require('jsonwebtoken');

const { config } = require('../lib/helper');
const Obj = require('../Helpers/Obj');

class JwtService {
  static generate(payload, secret, options = {}) {
    options.expiresIn = config('jwt.expiresIn');

    return jwt.sign(payload, secret, options);
  }

  static verify(token, secret, getPayload = false) {
    try {
      const verifyToken = jwt.verify(token, secret);

      if (getPayload) {
        return Obj.except(verifyToken, 'iat');
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = JwtService;
