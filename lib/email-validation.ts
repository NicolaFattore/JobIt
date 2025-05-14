/**
 * Validates email format using a comprehensive regex pattern
 * @param email - The email address to validate
 * @returns boolean indicating whether the email is valid
 */
export function validateEmail(email: string): boolean {
  // RFC 5322 compliant email regex with additional restrictions
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  // Check for null, undefined, or empty string
  if (!email) return false;

  // Trim whitespace and convert to lowercase for consistent validation
  const trimmedEmail = email.trim().toLowerCase();

  // Check email length constraints
  if (trimmedEmail.length < 3 || trimmedEmail.length > 254) return false;

  // Perform regex validation
  return emailRegex.test(trimmedEmail);
}

/**
 * Normalize email for consistent comparison
 * @param email - The email address to normalize
 * @returns normalized email (lowercase, trimmed)
 */
export function normalizeEmail(email: string): string {
  return email ? email.trim().toLowerCase() : '';
}

/**
 * Get a descriptive error message for invalid email
 * @param email - The email address to validate
 * @returns string with error message or null if email is valid
 */
export function getEmailValidationError(email: string): string | null {
  if (!email) return 'Email is required';
  
  const trimmedEmail = email.trim().toLowerCase();

  if (trimmedEmail.length < 3) return 'Email is too short';
  if (trimmedEmail.length > 254) return 'Email is too long';
  
  return validateEmail(trimmedEmail) ? null : 'Invalid email format';
}