const mongoose = require('mongoose');
const { Schema } = mongoose;

const billingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  meterId: { type: Schema.Types.ObjectId, ref: 'Meter', required: true, index: true },
  readingId: { type: Schema.Types.ObjectId, ref: 'Reading', unique: true, sparse: true },
  periodYear: { type: Number, required: true, index: true },
  periodMonth: { type: Number, required: true, min: 1, max: 12, index: true },
  units: { type: Number, required: true, min: 0 },
  ratePerUnit: { type: Number, required: true, min: 0 },
  subtotal: { type: Number, required: true, min: 0 },
  taxes: { type: Number, default: 0, min: 0 },
  totalAmount: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['draft', 'issued', 'paid', 'overdue', 'void'], default: 'draft', index: true },
  issuedAt: { type: Date },
  dueAt: { type: Date },
  paidAt: { type: Date },
  isActive: { type: Boolean, default: true, index: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Compound index for period (year + month) per meter and user
billingSchema.index({ userId: 1 });
billingSchema.index({ meterId: 1 });
billingSchema.index({ periodYear: 1, periodMonth: 1 });
billingSchema.index({ status: 1 });
billingSchema.index({ isActive: 1 });

module.exports = mongoose.model('Billing', billingSchema);