const express = require('express');
const router = express.Router();

const { response, responseError, randString } = require('../../app/lib/helper');
const User = require('../../app/Models/User');
const Obj = require('../../app/Helpers/Obj');
const Client = require('../../app/Models/Client');
const AccessToken = require('../../app/Models/AccessToken');

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

  const token = await user.token();
  const client = await Client.findOne({ userId: user._id });

  await AccessToken.create({
    userId: user._id,
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
    await Client.create({
      userId: user.id,
      secret: randString(8),
    });

    res.status(201).json(response(Obj.only(user, ['id', 'name']), 201));
  } catch (error) {
    console.log(error);
    res.status(422).json(responseError(422, error.message));
  }
});

module.exports = router;
