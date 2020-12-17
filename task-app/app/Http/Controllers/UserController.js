const { response, responseError } = require('../../lib/helper');
const User = require('../../Models/User');
const Obj = require('../../Helpers/Obj');

class UserController {
  async index(req, res) {
    const users = await User.find({});

    const listUser = await Promise.all(users.map((user) => user.profile()));

    res.json(response(listUser));
  }

  async show(req, res) {
    const { user } = req;

    if (!user) {
      return res
        .status(404)
        .json(responseError(404, `Cannot find user #${user.id}`));
    }

    res.json(response(await user.profile()));
  }

  async getTasks(req, res) {
    const user = req.user;

    if (!user) {
      return res
        .status(404)
        .json(responseError(404, `Cannot find user #${id}`));
    }

    res.json(response(await user.profile(true)));
  }

  async update(req, res) {
    const user = req.user;

    const updates = Obj.only(req.body, ['name']);

    await User.update({ _id: id }, updates, { runValidators: true });

    res.json(response(user.profile()));
  }

  async delete(req, res) {
    const { user } = req;

    await user.remove();

    res.json(response([], undefined, `User #${user.id} has been deleted!`));
  }
}

module.exports = new UserController();
