const mongoose = require('mongoose');
const { Schema } = mongoose;

const readingSchema = new Schema({
  meterId: { type: Schema.Types.ObjectId, ref: 'Meter', required: true },
  reading: { type: Number, required: true, min: 0 },
  previousReading: { type: Number, default: 0 },
  consumption: { type: Number, default: 0 },
  readingDate: { type: Date, required: true },
  recordedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  notes: { type: String, trim: true },
  images: [{
    url: String,
    filename: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  isVerified: { type: Boolean, default: false },
  verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  verifiedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

readingSchema.index({ meterId: 1, readingDate: -1 });
readingSchema.index({ readingDate: -1 });
readingSchema.index({ recordedBy: 1 });
readingSchema.index({ meterId: 1, createdAt: -1 });

module.exports = mongoose.model('Reading', readingSchema);