import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates an email address based on RFC 5322 standard
 * @param email - Email address to validate
 * @returns boolean indicating whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  // Comprehensive email regex following RFC 5322 standard
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Check for null, undefined, or empty string
  if (!email) return false;

  // Trim whitespace and validate
  const trimmedEmail = email.trim();
  
  // Check length constraints
  if (trimmedEmail.length < 3 || trimmedEmail.length > 254) return false;

  // Test against regex
  return emailRegex.test(trimmedEmail);
}