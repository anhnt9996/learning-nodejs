const jwt = require('jsonwebtoken');

const { config } = require('../lib/helper');
const Obj = require('../Helpers/Obj');

class JwtService {
  static generate(payload, secret, options = {}) {
    options.expiresIn = config('jwt.expiresIn');
    const token = jwt.sign(payload, secret, options);
    const decode = jwt.decode(token);
    return {
      token,
      exp: decode.exp * 1000,
    };
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

  static decode(token, payload = false) {
    try {
      const decodedToken = jwt.decode(token, { complete: payload });

      return decodedToken;
    } catch (error) {
      return null;
    }
  }
}

module.exports = JwtService;
