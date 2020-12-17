const bcrypt = require('bcryptjs');

const AccessToken = require('../../Models/AccessToken');
const Client = require('../../Models/Client');
const User = require('../../Models/User');
const Obj = require('../../Helpers/Obj');
const {
  responseError,
  config,
  response,
  randString,
} = require('../../lib/helper');

class AuthController {
  async login(req, res) {
    const { username, password } = req.body;

    const user = await User.findByCredentials(username, password);

    if (!user) {
      return res
        .status(403)
        .json(
          responseError(
            403,
            'Username or password does not match with out credential'
          )
        );
    }

    const token = await user.token();
    const client = await Client.findOne({ user_id: user._id });

    await AccessToken.create({
      user_id: user._id,
      clientId: client._id,
      name: token.token,
      expiresAt: token.exp,
    });

    res.json(
      response({
        ...Obj.only(user, ['name', 'username']),
        access_token: token.token,
        expiresAt: token.exp,
      })
    );
  }

  async register(req, res) {
    const userModel = new User(req.body);

    const exists = await User.exists({ username: req.body.username });

    if (exists) {
      return res
        .status(422)
        .json(responseError(422, 'Username already taken by other user!'));
    }

    try {
      const user = await userModel.save();
      await Client.create({
        user_id: user.id,
        secret: randString(8),
      });

      res.status(201).json(response(Obj.only(user, ['id', 'name']), 201));
    } catch (error) {
      console.log(error);
      res.status(422).json(responseError(422, error.message));
    }
  }

  async changePassword(req, res) {
    const { id: user_id } = req.params;

    const {
      current_password: currentPassword,
      new_password: newPassword,
      confirmation_password: confirmationPassword,
    } = req.body;

    if (newPassword !== confirmationPassword) {
      return res
        .status(422)
        .json(
          responseError(
            422,
            'New password does not match with confirmation password'
          )
        );
    }

    const user = await User.findById(user_id);

    if (!user) {
      return res
        .status(404)
        .json(responseError(404, `Cannot find user #${user_id}`));
    }

    if (!bcrypt.compareSync(currentPassword.toString(), user.password)) {
      return res
        .status(403)
        .json(
          responseError(403, `Current password not match with our credential!`)
        );
    }

    const password = await bcrypt.hash(
      newPassword.toString(),
      config('app.saltLength')
    );

    const updates = { password };

    await User.update({ _id: user_id }, updates);

    res.json(response({}, undefined, 'Password changed!'));
  }

  async logout(req, res) {
    const user = req.user;
    const { logout_all: isLogoutAll } = req.query;

    if (isLogoutAll) {
      this._logoutAll(user.id);

      return res.json(response());
    }

    const token = await AccessToken.findOne({
      user_id: user.id,
      name: req.accessToken,
      revoked: false,
    });

    if (token) {
      await token.updateOne({ $set: { revoked: true } });
    }

    res.json(response());
  }

  async _logoutAll(user_id) {
    const tokens = await AccessToken.find({
      user_id,
      revoked: false,
    });

    if (tokens) {
      await AccessToken.updateMany(
        {
          user_id,
          revoked: false,
        },
        { $set: { revoked: true } }
      );
    }

    return true;
  }
}

module.exports = new AuthController();
