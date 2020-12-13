const mongoose = require('mongoose');
const Obj = require('../Helpers/Obj');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: 'User',
  },
});

taskSchema.methods.detail = async function (withUser = false) {
  const task = Obj.only(this, [
    'id',
    'title',
    'description',
    'isCompleted:is_completed',
  ]);

  if (withUser) {
    await this.populate('userId').execPopulate();

    return {
      ...task,
      user: await this.userId.profile(),
    };
  }

  return task;
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
