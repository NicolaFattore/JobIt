import { normalizeEmail } from './validation';
import User from '../models/User';

/**
 * Check if an email is already registered
 * @param email Email to check for uniqueness
 * @returns Promise resolving to boolean indicating email uniqueness
 */
export const isEmailUnique = async (email: string): Promise<boolean> => {
  try {
    const normalizedEmail = normalizeEmail(email);
    const existingUser = await User.findOne({ email: normalizedEmail });
    return !existingUser;
  } catch (error) {
    console.error('Error checking email uniqueness:', error);
    return false;
  }
};

/**
 * Validate email uniqueness with detailed error handling
 * @param email Email to validate
 * @returns Validation result with message
 */
export const validateEmailUniqueness = async (email: string): Promise<{
  isUnique: boolean;
  message?: string;
}> => {
  try {
    const isUnique = await isEmailUnique(email);
    
    if (!isUnique) {
      return {
        isUnique: false,
        message: 'This email is already registered'
      };
    }
    
    return { isUnique: true };
  } catch (error) {
    console.error('Email uniqueness validation error:', error);
    return {
      isUnique: false,
      message: 'Error validating email uniqueness'
    };
  }
};