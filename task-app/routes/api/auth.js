const express = require('express');
const router = express.Router();

const { response, responseError } = require('../../app/lib/helper');
const User = require('../../app/Models/User');
const Obj = require('../../app/Helpers/Obj');

router.post('/login', async (req, res) => {
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

  res.json(
    response({
      ...Obj.only(user, ['name', 'username']),
      access_token: user.token(),
    })
  );
});

router.post('/register', async (req, res) => {
  const userModel = new User(req.body);

  const exists = await User.exists({ username: req.body.username });

  if (exists) {
    return res
      .status(422)
      .json(responseError(422, 'Username already taken by other user!'));
  }

  try {
    const user = await userModel.save();

    res.status(201).json(response(Obj.only(user, ['id', 'name']), 201));
  } catch (error) {
    res.status(422).json(responseError(422, error.message));
  }
});

module.exports = router;
