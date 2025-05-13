import { z } from 'zod';

/**
 * Normalize email for consistent comparison
 * @param email - Email to normalize
 * @returns normalized email
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Email validation schema using Zod with RFC 5322 compliant regex
 * Comprehensive email validation with strict format checking
 */
export const emailSchema = z.string()
  .trim() // Remove leading/trailing whitespace
  .transform(normalizeEmail) // Normalize email
  .refine(
    (email) => {
      // Comprehensive email validation regex
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return emailRegex.test(email);
    },
    { message: 'Invalid email format' }
  )
  .refine(
    (email) => email.length >= 5 && email.length <= 320,
    { message: 'Email must be between 5 and 320 characters' }
  );

/**
 * Validate email with comprehensive checks
 * @param email - Email address to validate
 * @returns boolean indicating if the email is valid
 */
export function validateEmail(email: string): boolean {
  try {
    // Normalize and validate email
    const normalizedEmail = normalizeEmail(email);
    emailSchema.parse(normalizedEmail);
    return true;
  } catch {
    return false;
  }
}
