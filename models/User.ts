import mongoose from 'mongoose';
import { normalizeEmail } from '../lib/validation';

// Define the User interface
export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the User schema
const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Database-level unique constraint
    lowercase: true, // Store email in lowercase
    trim: true, // Remove whitespace
    validate: {
      validator: function(value: string) {
        // Reuse existing email validation
        const { isValidEmail } = require('../lib/validation');
        return isValidEmail(value);
      },
      message: 'Please provide a valid email address'
    },
    index: true // Create an index for faster querying
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt
  // Ensure unique constraint is case-insensitive
  autoIndex: true
});

// Pre-save middleware to normalize email
UserSchema.pre('save', function(next) {
  // Normalize email before saving
  if (this.isModified('email')) {
    this.email = normalizeEmail(this.email);
  }
  next();
});

// Custom method to check if email exists
UserSchema.statics.emailExists = async function(email: string): Promise<boolean> {
  const normalizedEmail = normalizeEmail(email);
  const existingUser = await this.findOne({ email: normalizedEmail });
  return !!existingUser;
};

// Create and export the User model
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;