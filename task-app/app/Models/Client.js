const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  },
  secret: { type: String, maxlength: 100 },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
