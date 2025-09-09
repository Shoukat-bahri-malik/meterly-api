const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  deviceInfo: {
    userAgent: String,
    ipAddress: String,
    device: String
  },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});


sessionSchema.index({ userId: 1 });
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Session', sessionSchema);