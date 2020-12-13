const AccessToken = require('../Models/AccessToken');
const { empty } = require('../lib/helper');
const JwtService = require('./JwtService');
const Obj = require('../Helpers/Obj');
const User = require('../Models/User');

class AuthService {
  static async authorized(accessToken) {
    const userId = Obj.only(JwtService.decode(accessToken), 'userId');
    const user = await User.findById(userId);

    if (!user) {
      return false;
    }

    const token = await AccessToken.findOne({
      name: accessToken,
      userId,
      revoked: false,
    });

    const now = new Date().getTime();

    if (!token || token.revoked) {
      return false;
    }

    if (token.expiresAt < now) {
      await AccessToken.findByIdAndUpdate(token._id, { revoked: true });
      return false;
    }

    return user;
  }
}

module.exports = AuthService;
