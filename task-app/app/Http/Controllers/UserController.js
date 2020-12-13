const { response, responseError } = require('../../lib/helper');
const User = require('../../Models/User');
const Obj = require('../../Helpers/Obj');

class UserController {
  async index(req, res) {
    const users = await User.find({});

    const listUser = await Promise.all(
      users.map(async (user) => await user.profile())
    );

    res.json(response(listUser));
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json(responseError(404, `Cannot find user #${id}`));
    }

    res.json(response(await user.profile()));
  }

  async getTasks(req, res) {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json(responseError(404, `Cannot find user #${id}`));
    }

    res.json(response(await user.profile(true)));
  }

  async update(req, res) {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json(responseError(404, `Cannot find user #${id}`));
    }

    const updates = Obj.only(req.body, ['name']);

    await User.update({ _id: id }, updates, { runValidators: true });

    res.json(response(user.profile()));
  }
}

module.exports = new UserController();
