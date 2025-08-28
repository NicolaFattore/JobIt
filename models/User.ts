import mongoose from 'mongoose';
import { EmailValidator } from '../lib/email-validation';

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
    lowercase: true,
    validate: {
      validator: function(value: string) {
        return EmailValidator.validate(value);
      },
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    // Add password complexity validation if needed
  }
}, {
  timestamps: true,
  // Ensure case-insensitive unique index
  indexes: [{ 
    email: 1 
  }]
});

// Pre-save hook to normalize email
UserSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = EmailValidator.normalize(this.email);
  }
  next();
});

// Custom method to find user by email (case-insensitive)
UserSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: EmailValidator.normalize(email) });
};

// Create the User model
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;