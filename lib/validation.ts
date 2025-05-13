import { z } from 'zod';

/**
 * Email validation schema using Zod with RFC 5322 compliant regex
 * Comprehensive email validation with strict format checking
 */
export const emailSchema = z.string()
  .trim() // Remove leading/trailing whitespace
  .min(5, 'Email must be at least 5 characters')
  .max(320, 'Email cannot exceed 320 characters')
  .regex(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Invalid email format'
  );

/**
 * Validate email with comprehensive checks
 * @param email - Email address to validate
 * @returns boolean indicating if the email is valid
 */
export function validateEmail(email: string): boolean {
  try {
    // Normalize email to lowercase for case-insensitive validation
    const normalizedEmail = email.toLowerCase().trim();
    
    // Parse with Zod schema
    emailSchema.parse(normalizedEmail);
    
    return true;
  } catch (error) {
    return false;
  }

/**
 * Normalize email for consistent comparison
 * @param email - Email to normalize
 * @returns normalized email
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}}
