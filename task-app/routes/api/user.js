const express = require('express');
const router = express.Router();

const { response, responseError } = require('../../app/lib/helper');
const Obj = require('../../app/Helpers/Obj');

const User = require('../../app/Models/User');

router.get('/', async (req, res) => {
  const users = await User.find({});

  res.json(response(users.map((user) => ({ id: user.id, name: user.name }))));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json(responseError(404, `Cannot find user #${id}`));
  }

  res.json(response({ id: user.id, name: user.name }));
});

router.post('/', async (req, res) => {
  const userModel = new User(req.body);

  const exists = await User.exists({ username: req.body.username });

  if (exists) {
    return res
      .status(422)
      .json(responseError(422, 'Username already taken by other user!'));
  }

  try {
    const user = await userModel.save();

    res.status(201).json(response({ id: user.id, name: user.name }, 201));
  } catch (error) {
    res.status(422).json(responseError(422, error.message));
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json(responseError(404, `Cannot find user #${id}`));
  }

  const updates = Obj.only(req.body, ['name']);

  res.json(response({ id: user.id, name: user.name }));
});

module.exports = router;
