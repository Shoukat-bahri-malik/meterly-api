const mongoose = require('mongoose');
const { Schema } = mongoose;

const meterSchema = new Schema({
  ownerUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  serialNumber: { type: String, unique: true, required: true },
  type: { type: String, enum: ['Electric', 'Water', 'Gas'], required: true, index: true },
  status: { type: String, enum: ['Active', 'Inactive', 'Maintenance'], default: 'Active', index: true },
  location: { type: String },
  isActive: { type: Boolean, default: true, index: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Meter', meterSchema);