const mongoose = require('mongoose');
const Obj = require('../Helpers/Obj');

const taskSchema = new mongoose.Schema(
  {
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
    is_completed: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: 'User',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

taskSchema.methods.detail = async function (withUser = false) {
  const task = Obj.only(this, [
    'id',
    'title',
    'description',
    'is_completed',
    'updated_at:last_modified',
  ]);

  if (withUser) {
    await this.populate('user_id').execPopulate();

    return {
      ...task,
      user: await this.user_id.profile(),
    };
  }

  return task;
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
