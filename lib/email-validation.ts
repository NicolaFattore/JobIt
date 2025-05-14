/**
 * Validates email format with comprehensive rules
 * @param email - Email address to validate
 * @returns boolean indicating if email is valid
 */
export function validateEmail(email: string): boolean {
  // Check if email is empty or undefined
  if (!email) return false;

  // Trim whitespace and convert to lowercase
  const trimmedEmail = email.trim().toLowerCase();

  // Regex for email validation
  // Covers most standard email formats with some additional constraints
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // Additional validation checks
  if (!emailRegex.test(trimmedEmail)) return false;

  // Length constraints
  if (trimmedEmail.length < 5 || trimmedEmail.length > 100) return false;

  // Split email into local and domain parts
  const [localPart, domainPart] = trimmedEmail.split('@');

  // Additional checks for local and domain parts
  if (localPart.length < 1 || localPart.length > 64) return false;
  if (domainPart.length < 3 || domainPart.length > 255) return false;

  // Check for consecutive dots
  if (/\.{2,}/.test(trimmedEmail)) return false;

  // Ensure valid top-level domain (basic check)
  const domainParts = domainPart.split('.');
  if (domainParts.length < 2) return false;
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2 || tld.length > 63) return false;

  return true;
}

/**
 * Generates a descriptive error message for invalid emails
 * @param email - Email address to validate
 * @returns Error message or null if email is valid
 */
export function getEmailValidationError(email: string): string | null {
  if (!email) return 'Email cannot be empty';
  
  const trimmedEmail = email.trim().toLowerCase();

  if (trimmedEmail.length < 5) return 'Email is too short';
  if (trimmedEmail.length > 100) return 'Email is too long';

  if (!validateEmail(trimmedEmail)) {
    return 'Please enter a valid email address';
  }

  return null;
}