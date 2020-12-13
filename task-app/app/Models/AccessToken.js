const mongoose = require('mongoose');

const accessTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
    },
    clientId: {
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
