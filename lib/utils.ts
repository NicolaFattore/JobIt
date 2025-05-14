import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validates an email address against RFC 5322 standard
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  // Comprehensive email validation regex based on RFC 5322 standard
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Check for null, undefined, or empty string
  if (!email) return false;

  // Trim whitespace and validate
  const trimmedEmail = email.trim();
  
  // Length checks
  if (trimmedEmail.length < 5 || trimmedEmail.length > 254) return false;

  // Regex validation
  return emailRegex.test(trimmedEmail);
}