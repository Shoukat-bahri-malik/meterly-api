const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { 
    type: String, required: [ true, 'Name is required' ] 
  },
  email: { 
    type: String, unique: true, index: true, required: [ true, 'Email is required' ] 
  },
  passwordHash: { 
    type: String, required: [ true, 'Password is required' ] 
  },
  role: { 
    type: String, enum: ['admin', 'reader', 'guest'], required: true 
  },
  rights: [{ type: String }],
  isActive: { type: Boolean, default: true, index: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);