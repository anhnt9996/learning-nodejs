const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { config } = require('../lib/helper');
const JwtService = require('../Services/JwtService');

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
    validate(value) {
      if (validator.contains(value, 'password')) {
        throw new Error('Password must not contain "password!');
      }
    },
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, config('app.salt'));
  }

  next();
});

userSchema.statics.findByCredentials = async function (
  username,
  password = ''
) {
  const user = await this.findOne({ username });
  if (!user) {
    return;
  }

  if (!bcrypt.compareSync(password.toString(), user.password)) {
    return;
  }

  return user;
};

userSchema.methods.token = function () {
  const payload = {
    id: this._id.toString(),
    name: this.name,
  };

  return JwtService.generate(payload, 'secret');
};

const User = mongoose.model('User', userSchema);

module.exports = User;
