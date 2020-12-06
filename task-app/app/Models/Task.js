const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
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
});

module.exports = Task;
