const mongoose = require('mongoose');

const accessTokenSchema = new mongoose.Schema(
  {
    userId: { type: String, index: true },
    clientId: { type: String, index: true },
    name: String,
    revoked: { type: Boolean, default: false },
    expiresAt: Number,
  },
  { collection: 'access_tokens' }
);
const AccessToken = mongoose.model('AccessToken', accessTokenSchema);

module.exports = AccessToken;
