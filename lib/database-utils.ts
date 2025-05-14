import { normalizeEmail } from './validation';

/**
 * Interface for user-like object with email
 */
interface UserEntity {
  email: string;
  [key: string]: any;
}

/**
 * Checks email uniqueness with case-insensitive comparison
 * @param collection - Array of user entities
 * @param email - Email to check for uniqueness
 * @returns Promise resolving to boolean indicating email uniqueness
 */
export const isEmailUnique = async (
  collection: UserEntity[], 
  email: string
): Promise<boolean> => {
  // Normalize the email for consistent comparison
  const normalizedEmail = normalizeEmail(email);
  
  // Find any user with matching normalized email
  const existingUser = collection.find(
    user => normalizeEmail(user.email) === normalizedEmail
  );
  
  // Return true if no matching user found
  return !existingUser;
};

/**
 * Creates a database-level unique constraint for email
 * @param collection - Array of user entities
 * @returns Function that can be used as a unique constraint validator
 */
export const createEmailUniqueConstraint = (collection: UserEntity[]) => {
  return async (email: string): Promise<boolean> => {
    return isEmailUnique(collection, email);
  };
};