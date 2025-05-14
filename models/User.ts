import mongoose from 'mongoose';
import { isValidEmail } from '../lib/validation';

// Define the User schema interface
interface IUser extends mongoose.Document {
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the User schema with unique, case-insensitive email validation
const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true, // Store emails in lowercase
    trim: true,
    validate: {
      validator: function(value: string) {
        return isValidEmail(value);
      },
      message: 'Invalid email format'
    }
  }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt
  // Ensure case-insensitive unique index
  autoIndex: true
});

// Create a pre-save middleware to ensure email uniqueness
UserSchema.pre('save', async function(next) {
  // Only run this check if email is modified
  if (!this.isModified('email')) return next();

  try {
    // Check for existing user with the same email (case-insensitive)
    const existingUser = await this.constructor.findOne({ 
      email: this.email 
    });

    if (existingUser && existingUser._id.toString() !== this._id.toString()) {
      next(new Error('Email already in use'));
    } else {
      next();
    }
  } catch (error) {
    next(error as mongoose.CallbackError);
  }
});

// Create a compound unique index for case-insensitive email
UserSchema.index({ email: 1 }, { 
  unique: true, 
  collation: { locale: 'en', strength: 2 } 
});

// Ensure email is lowercase before saving
UserSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});

// Create and export the User model
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;