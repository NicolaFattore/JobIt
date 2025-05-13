import mongoose from 'mongoose';
import { isValidEmail } from '../lib/utils';

// Normalize email for case-insensitive comparison
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Define the User schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true, // Automatically convert to lowercase
    validate: {
      validator: function(email: string) {
        return isValidEmail(email);
      },
      message: 'Invalid email format'
    },
    index: { 
      unique: true,  // Create a unique index
      collation: { locale: 'en', strength: 2 } // Case-insensitive unique constraint
    }
  },
  // Other user fields can be added here
}, {
  timestamps: true,
  strict: true
});

// Pre-save middleware to normalize email
UserSchema.pre('save', function(next) {
  // Normalize email before saving
  if (this.isModified('email')) {
    const normalizedEmail = normalizeEmail(this.email);
    
    // Validate normalized email
    if (!isValidEmail(normalizedEmail)) {
      return next(new Error('Invalid email format'));
    }
    
    this.email = normalizedEmail;
  }
  next();
});

// Custom method to check email uniqueness
UserSchema.statics.isEmailTaken = async function(email: string): Promise<boolean> {
  const normalizedEmail = normalizeEmail(email);
  const existingUser = await this.findOne({ 
    email: { 
      $regex: new RegExp(`^${normalizedEmail}$`, 'i') 
    } 
  });
  return !!existingUser;
};

// Create a model or use an existing one
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;