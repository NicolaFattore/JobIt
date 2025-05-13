import mongoose from 'mongoose';
import { isValidEmail } from '../lib/utils';

// Define the User schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(email: string) {
        return isValidEmail(email);
      },
      message: 'Invalid email format'
    },
    index: true // Create an index for faster unique constraint checking
  },
  // Other user fields can be added here
}, {
  timestamps: true, // Add createdAt and updatedAt fields
  strict: true // Ensure only defined fields can be added
});

// Create a compound unique index if needed
UserSchema.index({ email: 1 }, { unique: true });

// Pre-save hook to ensure email validation
UserSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    if (!isValidEmail(this.email)) {
      return next(new Error('Invalid email format'));
    }
  }
  next();
});

// Create a model or use an existing one
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;