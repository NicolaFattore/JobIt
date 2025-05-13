import { z } from 'zod';

/**
 * Email validation schema using Zod
 * Follows RFC 5322 standard with additional checks
 */
export const emailSchema = z.string()
  .email('Invalid email address')
  .min(5, 'Email must be at least 5 characters')
  .max(320, 'Email cannot exceed 320 characters')
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format');

export function validateEmail(email: string) {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
}