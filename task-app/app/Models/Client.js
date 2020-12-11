const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  userId: { type: String, index: true },
  secret: { type: String, maxlength: 100 },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
