const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
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

module.exports = User;
