import mongoose from 'mongoose';
import { validateEmail } from '../validate-email';

// Define custom validator for unique email
async function isEmailUnique(email: string): Promise<boolean> {
  // Normalize email for case-insensitive comparison
  const normalizedEmail = email.trim().toLowerCase();
  
  // Check if email already exists in the database
  const existingUser = await mongoose.models.User.findOne({ 
    email: { 
      $regex: new RegExp(`^${normalizedEmail}$`, 'i') 
    } 
  });
  
  return !existingUser;
}

// User Schema with comprehensive email validation
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [
      {
        // Format validation
        validator: function(email: string) {
          const validationResult = validateEmail(email);
          return validationResult.isValid;
        },
        message: 'Invalid email format'
      },
      {
        // Unique email validation
        validator: isEmailUnique,
        message: 'Email is already registered'
      }
    ]
  },
  // Other user fields...
}, {
  // Enable additional validation checks
  runValidators: true
});

// Create a case-insensitive unique index
UserSchema.index({ email: 1 }, { 
  unique: true, 
  collation: { 
    locale: 'en', 
    strength: 2 // Case-insensitive comparison
  } 
});

// Pre-save middleware for additional validation
UserSchema.pre('save', async function(next) {
  // Normalize email
  this.email = this.email.trim().toLowerCase();
  
  // Check email uniqueness
  try {
    const isUnique = await isEmailUnique(this.email);
    if (!isUnique) {
      const error = new Error('Email must be unique');
      next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Create model with error handling for duplicate keys
UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Email must be unique'));
  } else {
    next(error);
  }
});

// Compile and export the model
export const User = mongoose.models.User || mongoose.model('User', UserSchema);