const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { config } = require('../lib/helper');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (validator.contains(value, 'password')) {
        throw new Error('Password must not contain "password!');
      }
    },
  },
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash('password', config('app.salt'));
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
