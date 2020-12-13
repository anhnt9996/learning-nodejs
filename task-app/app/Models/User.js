const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const JwtService = require('../Services/JwtService');
const { config } = require('../lib/helper');
const Obj = require('../Helpers/Obj');
const Client = require('./Client');

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
    this.password = await bcrypt.hash(this.password, config('app.saltLength'));
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

  if (!(await bcrypt.compare(password.toString(), user.password))) {
    return;
  }

  return user;
};

userSchema.methods.token = async function () {
  const payload = {
    userId: this._id.toString(),
    name: this.name,
  };

  const client = await Client.findOne({ userId: this._id });

  return JwtService.generate(payload, client.secret);
};

userSchema.methods.profile = async function (withTasks = false) {
  const user = Obj.only(this, ['id', 'name']);
  if (withTasks) {
    return {
      ...user,
      tasks: await this.getTasks(),
    };
  }

  return user;
};

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'userId',
});

userSchema.methods.getTasks = async function () {
  await this.populate('tasks').execPopulate();

  return await Promise.all(this.tasks.map(async (task) => await task.detail()));
};

const User = mongoose.model('User', userSchema);

module.exports = User;
