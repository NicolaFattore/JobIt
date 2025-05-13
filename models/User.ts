import mongoose from 'mongoose';
import { validateEmail, normalizeEmail } from '../lib/validation';

// Define the User schema with robust email constraints
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Database-level unique constraint
    trim: true,
    lowercase: true, // Always store in lowercase
    validate: {
      validator: function(value: string) {
        return validateEmail(value);
      },
      message: 'Invalid email format'
    },
    index: { 
      unique: true,  // Ensure unique index
      collation: { locale: 'en', strength: 2 } // Case-insensitive unique index
    }
  },
  // Other user fields
}, {
  timestamps: true // Add createdAt and updatedAt
});

// Pre-save middleware to normalize email
UserSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    // Normalize email before saving
    this.email = normalizeEmail(this.email);
  }
  next();
});

// Static method to check email uniqueness
UserSchema.statics.isEmailTaken = async function(email: string) {
  const normalizedEmail = normalizeEmail(email);
  const user = await this.findOne({ 
    email: { 
      $regex: new RegExp(`^${normalizedEmail}$`, 'i') 
    } 
  });
  return !!user;
};

// Create a compound unique index with case-insensitive collation
UserSchema.index({ email: 1 }, { 
  unique: true, 
  collation: { locale: 'en', strength: 2 } 
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
