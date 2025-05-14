import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validate email format using a comprehensive regex
 * @param email - Email address to validate
 * @returns boolean indicating whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  // Comprehensive email validation regex
  // Supports:
  // - Standard email formats
  // - Quoted local parts
  // - Multiple dots in local part
  // - Subdomains
  // - IP address domains
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Validate input
  if (!email || typeof email !== 'string') return false;

  // Trim and convert to lowercase for consistent validation
  const normalizedEmail = email.trim().toLowerCase();

  // Length constraints
  const MAX_EMAIL_LENGTH = 254;
  const MAX_LOCAL_PART_LENGTH = 64;
  const MAX_DOMAIN_LENGTH = 255;

  // Check overall email length
  if (normalizedEmail.length > MAX_EMAIL_LENGTH) return false;

  // Validate using comprehensive regex
  if (!emailRegex.test(normalizedEmail)) return false;

  // Split email into local part and domain
  const [localPart, domain] = normalizedEmail.split('@');

  // Check lengths of local part and domain
  if (localPart.length > MAX_LOCAL_PART_LENGTH) return false;
  if (domain.length > MAX_DOMAIN_LENGTH) return false;

  return true;
}

/**
 * Normalize email for consistent comparison
 * @param email - Email address to normalize
 * @returns normalized email address
 */
export function normalizeEmail(email: string): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}