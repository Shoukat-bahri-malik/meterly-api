const mongoose = require('mongoose');
const { Schema } = mongoose;

const meterSchema = new Schema({
  serialNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true,
  },
  type: { 
    type: String, 
    enum: ['Water', 'Gas', 'Electricity'], 
    required: true, 
    index: true 
  },
  location: { 
    type: String, 
    required: true, 
    trim: true 
  },
  customer: { 
    type: String, 
    required: true, 
    trim: true,
    index: true
  },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive', 'Maintenance'], 
    default: 'Active',
    index: true 
  },
  lastReading: { 
    type: Number, 
    default: 0 
  },
  lastReadingDate: { 
    type: Date 
  },
  installationDate: { 
    type: Date, 
    default: Date.now 
  },
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
}, { 
  timestamps: true // This automatically adds and manages createdAt and updatedAt
});

module.exports = mongoose.model('Meter', meterSchema);