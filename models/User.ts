import mongoose from 'mongoose';
import { validateEmail } from '../lib/validation';

// Define interface for type safety
interface IUser extends mongoose.Document {
  email: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v: string) {
        return validateEmail(v);
      },
      message: 'Invalid email format'
    }
  }
}, { 
  timestamps: true 
});

// Create a compound unique index to ensure case-insensitive unique constraint
UserSchema.index({ email: 1 }, { 
  unique: true, 
  collation: { locale: 'en', strength: 2 } 
});

// Pre-save middleware to normalize email
UserSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = this.email.trim().toLowerCase();
  }
  next();
});

// Handle duplicate key error with a more informative message
UserSchema.post('save', function(error: any, doc: any, next: any) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('An account with this email already exists'));
  } else {
    next(error);
  }
});

// Create the model, avoiding re-compilation
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);