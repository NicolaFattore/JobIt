import mongoose from 'mongoose';
import { normalizeEmail } from '../lib/validation';

// Define the User schema with email uniqueness
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Database-level unique constraint
    lowercase: true, // Store emails in lowercase
    trim: true, // Remove whitespace
    validate: {
      validator: function(v: string) {
        // Use the existing email validation
        const { isValidEmail } = require('../lib/utils');
        return isValidEmail(v);
      },
      message: 'Invalid email format'
    }
  },
  // Other user fields...
}, {
  // Add index for case-insensitive unique email
  indexes: [
    { email: 1 }, // Ascending index
    { email: 'text' } // Text index for case-insensitive search
  ]
});

// Pre-save middleware to normalize email
UserSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = normalizeEmail(this.email);
  }
  next();
});

// Custom method to check email uniqueness
UserSchema.statics.isEmailTaken = async function(email: string) {
  const normalizedEmail = normalizeEmail(email);
  const user = await this.findOne({ email: normalizedEmail });
  return !!user;
};

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
