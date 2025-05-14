import mongoose from 'mongoose';
import { validateEmail, normalizeEmail } from '../lib/email-validation';

// Define the User schema interface
export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  // Add other user fields as needed
}

// Create the User schema
const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Database-level unique constraint
    trim: true,
    lowercase: true, // Ensure lowercase storage
    validate: {
      validator: function(value: string) {
        return validateEmail(value);
      },
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    // Add password complexity validation if needed
  }
  // Add other user schema fields
}, {
  timestamps: true, // Add createdAt and updatedAt fields
  // Ensure case-insensitive unique index
  indexes: [{ 
    email: 1 
  }]
});

// Pre-save hook to normalize email
UserSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = normalizeEmail(this.email);
  }
  next();
});

// Custom method to find user by email (case-insensitive)
UserSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: normalizeEmail(email) });
};

// Create the User model
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;