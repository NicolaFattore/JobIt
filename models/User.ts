import mongoose from 'mongoose';
import { validateAndNormalizeEmail } from '../lib/validation';

// Email validation function for Mongoose
const validateEmail = (email: string): boolean => {
  return validateAndNormalizeEmail(email) !== null;
};

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: validateEmail,
      message: 'Invalid email format'
    },
    index: { unique: true }
  },
  // Other user fields can be added here
}, {
  timestamps: true
});

// Ensure unique, case-insensitive index
UserSchema.index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);