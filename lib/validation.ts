/**
 * Comprehensive email validation based on RFC 5322 and additional checks
 * @param email - The email address to validate
 * @returns boolean indicating whether the email is valid
 */
export const isValidEmail = (email: string | null | undefined): boolean => {
  // Comprehensive email validation regex
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Check for null, undefined, or empty string
  if (!email) return false;
  
  // Trim and lowercase for consistent validation
  const trimmedEmail = email.trim().toLowerCase();
  
  // Length constraints
  if (trimmedEmail.length < 3 || trimmedEmail.length > 254) return false;
  
  // Validate using regex
  if (!emailRegex.test(trimmedEmail)) return false;
  
  // Split email into local part and domain
  const [localPart, domain] = trimmedEmail.split('@');
  
  // Additional checks
  if (!localPart || !domain) return false;
  
  // Local part length check (max 64 characters)
  if (localPart.length > 64) return false;
  
  // Prevent consecutive dots
  if (/\.{2,}/.test(localPart) || /\.{2,}/.test(domain)) return false;
  
  // Domain length check
  if (domain.length > 255) return false;
  
  return true;
};

/**
 * Sanitizes an email address
 * @param email - The email address to sanitize
 * @returns sanitized email address
 */
export const sanitizeEmail = (email: string | null | undefined): string => {
  if (!email) return '';
  return email.trim().toLowerCase();
};

/**
 * Normalizes email for unique constraint checks
 * @param email - The email address to normalize
 * @returns normalized email
 */
export const normalizeEmail = (email: string | null | undefined): string => {
  if (!email) return '';
  return email.trim().toLowerCase();
};