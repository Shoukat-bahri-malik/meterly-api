const mongoose = require('mongoose');
const { Schema } = mongoose;

const meterSchema = new Schema({
  serialNumber: { type: String, required: true, unique: true, uppercase: true },
  type: { type: String, enum: ['Water', 'Gas', 'Electricity'], required: true },
  location: { type: String, required: true, trim: true },
  customer: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Active', 'Inactive', 'Maintenance'], default: 'Active' },
  lastReading: { type: Number, default: 0 },
  lastReadingDate: { type: Date },
  installationDate: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

meterSchema.index({ serialNumber: 1 }, { unique: true });
meterSchema.index({ type: 1 });
meterSchema.index({ status: 1 });
meterSchema.index({ customer: 1 });

module.exports = mongoose.model('Meter', meterSchema);