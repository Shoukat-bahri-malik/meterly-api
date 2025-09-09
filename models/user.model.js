const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { 
    type: String, required: [ true, 'Name is required' ] 
  },
  email: { 
    type: String, 
    unique: true, 
    index: true, 
    required: [ true, 'Email is required' ],
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email']
  },
  passwordHash: { 
    type: String, required: [ true, 'Password is required' ] 
  },
  role: { 
    type: String, enum: ['Admin', 'Reader', 'Guest'], default: 'Guest', required: true 
  },
  rights: [{ type: String }],
  isActive: { type: Boolean, default: true, index: true },
  lastLogin: { type: Date },
  rememberToken: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

module.exports = mongoose.model('User', userSchema);