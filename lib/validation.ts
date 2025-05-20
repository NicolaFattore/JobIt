import mongoose from 'mongoose';

/**
 * Validates email format according to RFC 5322 standard
 * @param email - Email address to validate
 * @returns boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  // Trim and convert to lowercase for consistent validation
  if (!email) return false;
  const trimmedEmail = email.trim().toLowerCase();
  
  // Comprehensive RFC 5322 email validation regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Validate email format and length
  if (
    trimmedEmail.length < 5 || 
    trimmedEmail.length > 254 || 
    !emailRegex.test(trimmedEmail)
  ) {
    return false;
  }
  
  // Additional checks for email parts
  const [local, domain] = trimmedEmail.split('@');
  return (
    local.length <= 64 && 
    domain.length <= 253 && 
    domain.split('.').every(part => part.length <= 63)
  );
};

/**
 * Generates a descriptive error message for email validation
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
 * Creates a unique email validator for Mongoose
 * @param model - Mongoose model to check against
 * @returns Async validation function
 */
export const createUniqueEmailValidator = (model: mongoose.Model<any>) => {
  return async function(email: string): Promise<boolean> {
    // Validate email format first
    if (!isValidEmail(email)) {
      throw new Error('Invalid email format');
    }
    
    // Perform case-insensitive unique check
    const existingUser = await model.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });
    
    // Return true if no existing user found
    return !existingUser;
  };
};