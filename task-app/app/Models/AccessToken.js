const mongoose = require('mongoose');

const accessTokenSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
    },
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
    },
    name: String,
    revoked: { type: Boolean, default: false },
    expiresAt: Number,
  },
  { collection: 'access_tokens' }
);
const AccessToken = mongoose.model('AccessToken', accessTokenSchema);

module.exports = AccessToken;
