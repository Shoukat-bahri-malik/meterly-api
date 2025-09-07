const mongoose = require('mongoose');
const { Schema } = mongoose;

const readingSchema = new Schema({
  meterId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Meter',
     required: true, 
     index: true 
    },
  readingAt: { type: Date, required: true, index: true },
  periodYear: { type: Number, required: true },
  periodMonth: { type: Number, min: 1, max: 12, required: true },
  previousReading: { type: Number, required: true, min: 0 },
  currentReading: { type: Number, required: true, min: 0 },
  units: { type: Number, required: true, min: 0 },
  isEstimated: { type: Boolean, default: false },
  note: { type: String },
  isActive: { type: Boolean, default: true, index: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

readingSchema.index({ meterId: 1, periodYear: 1, periodMonth: 1 }, { unique: true });

module.exports = mongoose.model('Reading', readingSchema);