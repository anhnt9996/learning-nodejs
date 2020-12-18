const AccessToken = require('../Models/AccessToken');
const JwtService = require('./JwtService');
const Obj = require('../Helpers/Obj');
const User = require('../Models/User');

class AuthService {
  static async authorized(accessToken) {
    const user_id = Obj.only(JwtService.decode(accessToken), 'user_id');
    const user = await User.findById(user_id);

    if (!user) {
      return false;
    }

    const token = await AccessToken.findOne({
      name: accessToken,
      user_id,
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
