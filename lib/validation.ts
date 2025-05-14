/**
 * Validates an email address using a comprehensive regex pattern
 * @param email - The email address to validate
 * @returns boolean indicating whether the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  // RFC 5322 Official Standard email validation regex
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Check for null, undefined, or empty string
  if (!email) return false;
  
  // Trim whitespace and convert to lowercase for consistent validation
  const trimmedEmail = email.trim().toLowerCase();
  
  // Check length constraints
  if (trimmedEmail.length > 254) return false;
  
  // Validate using regex
  return emailRegex.test(trimmedEmail);
};

/**
 * Sanitizes an email address by trimming whitespace and converting to lowercase
 * @param email - The email address to sanitize
 * @returns sanitized email address
 */
export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};