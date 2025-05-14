import mongoose from 'mongoose';
import { isValidEmail, normalizeEmail } from '../lib/utils';

// Define the User schema with unique email constraint
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Database-level unique constraint
    lowercase: true, // Always store in lowercase
    trim: true, // Remove whitespace
    index: true, // Create an index for faster querying
    validate: {
      validator: function(value: string) {
        return isValidEmail(value);
      },
      message: 'Invalid email format'
    }
  },
  // Other user fields can be added here
}, {
  // Add a unique compound index to ensure case-insensitive uniqueness
  indexes: [{ 
    email: 1 
  }]
});

// Pre-save middleware to normalize email
UserSchema.pre('save', function(next) {
  // Normalize email before saving
  if (this.email) {
    this.email = normalizeEmail(this.email);
  }
  next();
});

// Custom method to check email uniqueness
UserSchema.statics.isEmailTaken = async function(email: string): Promise<boolean> {
  const normalizedEmail = normalizeEmail(email);
  const user = await this.findOne({ email: normalizedEmail });
  return !!user;
};

// Create the User model (or use existing model if already created)
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;