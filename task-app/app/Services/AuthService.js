const AccessToken = require('../Models/AccessToken');
const JwtService = require('./JwtService');
const Obj = require('../Helpers/Obj');
const { empty } = require('../lib/helper');

class AuthService {
  static async authorized(accessToken) {
    const userId = Obj.only(JwtService.decode(accessToken), 'userId');

    if (empty(userId)) {
      return false;
    }
    const token = await AccessToken.findOne({
      name: accessToken,
      userId,
    });

    const now = new Date().getTime();

    if (!token || token.revoked) {
      return false;
    }

    if (token.expiresAt < now) {
      await AccessToken.findByIdAndUpdate(token._id, { revoked: true });
      return false;
    }

    return true;
  }
}

module.exports = AuthService;
