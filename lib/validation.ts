import mongoose from 'mongoose';

/**
 * Implements RFC 5322 standard email validation with additional safety checks
 * @param email - Email address to validate
 * @returns boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  // Comprehensive RFC 5322 email validation regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Validate email format, length, and complexity
  if (!email) return false;
  
  // Trim and convert to lowercase for consistent validation
  const trimmedEmail = email.trim().toLowerCase();
  
  // Length checks
  if (trimmedEmail.length < 5 || trimmedEmail.length > 254) return false;
  
  // Additional checks
  const parts = trimmedEmail.split('@');
  if (parts.length !== 2) return false;
  
  const [local, domain] = parts;
  
  // Local part and domain length checks
  if (local.length > 64 || domain.length > 253) return false;
  
  // Final regex test
  return emailRegex.test(trimmedEmail);
};

/**
 * Provides a descriptive error message for invalid email formats
 * @param email - Email address to validate
 * @returns Error message or null if email is valid
 */
export const getEmailValidationError = (email: string): string | null => {
  if (!email || email.trim().length === 0) {
    return 'Email address is required';
  }
  
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address (e.g., example@domain.com)';
  }
  
  return null;
};

/**
 * Creates a case-insensitive unique email validation for Mongoose
 * @returns Mongoose validation function
 */
export const createUniqueEmailValidator = (model: mongoose.Model<any>) => {
  return async function(email: string): Promise<boolean> {
    if (!isValidEmail(email)) {
      throw new Error('Invalid email format');
    }
    
    // Case-insensitive unique check
    const existingUser = await model.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });
    
    return !existingUser;
  };
};