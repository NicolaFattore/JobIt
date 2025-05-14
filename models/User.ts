import mongoose from 'mongoose';
import { validateEmail } from '../lib/validation';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validateEmail,
      message: 'Invalid email format'
    }
  },
  // Other user fields would be added here
}, { 
  timestamps: true,
  // Ensure unique index creation for email
  indexes: [{ email: 1 }]
});

// Create a pre-save hook to ensure email validation
UserSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = this.email.trim().toLowerCase();
  }
  next();
});

// Ensure unique constraint with a more descriptive error
UserSchema.plugin(require('mongoose-unique-validator'), {
  message: 'An account with this email already exists.'
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);