import { normalizeEmail } from './validation';

/**
 * Checks if an email is unique in a collection, case-insensitively
 * @param collection - The collection to check
 * @param email - The email to check for uniqueness
 * @returns boolean indicating whether the email is unique
 */
export const isEmailUnique = async (
  collection: any[], 
  email: string
): Promise<boolean> => {
  const normalizedEmail = normalizeEmail(email);
  
  // Check for existing email case-insensitively
  const existingUser = collection.find(
    user => normalizeEmail(user.email) === normalizedEmail
  );
  
  return !existingUser;
};