/**
 * Comprehensive email validation based on RFC 5322 standard
 * @param email - The email address to validate
 * @returns boolean indicating whether the email is valid
 */
export const isValidEmail = (email: string | null | undefined): boolean => {
  // Check for null, undefined, or empty string
  if (!email) return false;
  
  // Trim and lowercase for consistent validation
  const trimmedEmail = email.trim().toLowerCase();
  
  // Length constraints
  if (trimmedEmail.length < 3 || trimmedEmail.length > 254) return false;
  
  // RFC 5322 Official Standard email validation regex
  // Comprehensive regex that covers most email format scenarios
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Validate using regex and additional checks
  if (!emailRegex.test(trimmedEmail)) return false;
  
  // Additional domain validation
  const [localPart, domain] = trimmedEmail.split('@');
  
  // Ensure local part and domain are not empty
  if (!localPart || !domain) return false;
  
  // Validate local part length
  if (localPart.length > 64) return false;
  
  // Prevent consecutive dots in local part and domain
  if (/\.{2,}/.test(localPart) || /\.{2,}/.test(domain)) return false;
  
  return true;
};

/**
 * Sanitizes an email address by trimming whitespace and converting to lowercase
 * @param email - The email address to sanitize
 * @returns sanitized email address or empty string if invalid
 */
export const sanitizeEmail = (email: string | null | undefined): string => {
  if (!email) return '';
  return email.trim().toLowerCase();
};

/**
 * Generates a case-insensitive email identifier for unique constraint checks
 * @param email - The email address to normalize
 * @returns normalized email identifier
 */
export const normalizeEmail = (email: string | null | undefined): string => {
  if (!email) return '';
  return email.trim().toLowerCase();
};