const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { response, responseError, config } = require('../../app/lib/helper');
const Obj = require('../../app/Helpers/Obj');
const User = require('../../app/Models/User');

router.get('/', async (req, res) => {
  const users = await User.find({});

  res.json(response(users.map((user) => Obj.only(user, ['id', 'name']))));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json(responseError(404, `Cannot find user #${id}`));
  }

  res.json(response(Obj.only(user, ['id', 'name'])));
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json(responseError(404, `Cannot find user #${id}`));
  }

  const updates = Obj.only(req.body, ['name']);

  await User.update({ _id: id }, updates, { runValidators: true });

  res.json(response(Obj.only(user, ['id', 'name'])));
});

router.put('/:id/change-password', async (req, res) => {
  const { id } = req.params;

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

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json(responseError(404, `Cannot find user #${id}`));
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
    config('app.salt')
  );

  const updates = { password };

  await User.update({ _id: id }, updates);

  res.json(response({}, undefined, 'Password changed!'));
});

module.exports = router;
