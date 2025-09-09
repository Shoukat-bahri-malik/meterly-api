const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['Monthly', 'Quarterly', 'Yearly'], required: true },
  period: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
  },
  meterId: { type: Schema.Types.ObjectId, ref: 'Meter' },
  meterIds: [{ type: Schema.Types.ObjectId, ref: 'Meter' }],
  data: {
    totalConsumption: Number,
    averageConsumption: Number,
    peakConsumption: Number,
    readings: [{
      date: Date,
      reading: Number,
      consumption: Number
    }],
    costAnalysis: {
      totalCost: Number,
      averageCost: Number,
      rateStructure: String
    },
    usagePattern: {
      dailyAverage: Number,
      weeklyTrend: String,
      monthlyComparison: String
    }
  },
  format: { type: String, enum: ['PDF', 'Excel'], default: 'PDF' },
  fileUrl: String,
  generatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Generated', 'Failed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  generatedAt: { type: Date }
});

reportSchema.index({ generatedBy: 1, createdAt: -1 });
reportSchema.index({ meterId: 1, 'period.startDate': 1 });
reportSchema.index({ type: 1, status: 1 });

module.exports = mongoose.model('Report', reportSchema);