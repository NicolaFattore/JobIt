import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates an email address with comprehensive checks
 * @param email - Email address to validate
 * @returns boolean indicating whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  // Handle null, undefined, or empty inputs
  if (!email) return false;

  // Trim and normalize email
  const trimmedEmail = email.trim().toLowerCase();

  // Check overall length constraints (RFC 5321)
  if (trimmedEmail.length < 3 || trimmedEmail.length > 254) return false;

  // Comprehensive email validation regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // Additional specific checks
  if (!emailRegex.test(trimmedEmail)) return false;

  // Split email into local and domain parts
  const [local, domain] = trimmedEmail.split('@');
  
  // Check local part length (64 characters max)
  if (local.length > 64) return false;

  // Reject emails with consecutive dots
  if (/\.{2,}/.test(trimmedEmail)) return false;

  // Ensure domain has at least one dot and valid characters
  if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) return false;

  return true;
}

/**
 * Normalizes an email address
 * @param email - Email address to normalize
 * @returns normalized email
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}