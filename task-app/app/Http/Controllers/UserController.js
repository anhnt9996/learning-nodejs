const { response, responseError } = require('../../lib/helper');
const User = require('../../Models/User');
const Obj = require('../../Helpers/Obj');

class UserController {
  async index(req, res) {
    const users = await User.find({});

    res.json(response(users.map((user) => Obj.only(user, ['id', 'name']))));
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json(responseError(404, `Cannot find user #${id}`));
    }

    res.json(response(Obj.only(user, ['id', 'name'])));
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

    res.json(response(Obj.only(user, ['id', 'name'])));
  }
}

module.exports = new UserController();
