/**
 * Validates an email address using a comprehensive RFC 5322 compliant regex
 * @param email The email address to validate
 * @returns Boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  // Comprehensive RFC 5322 email validation regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Trim and validate email
  const trimmedEmail = email.trim();
  
  // Check length, format, and basic structure
  return trimmedEmail.length > 0 && 
         trimmedEmail.length <= 254 && 
         emailRegex.test(trimmedEmail);
};

/**
 * Normalize email for case-insensitive comparison
 * @param email The email to normalize
 * @returns Normalized email address
 */
export const normalizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

/**
 * Generate a user-friendly email validation error message
 * @param email The email address that failed validation
 * @returns Descriptive error message
 */
export const getEmailValidationError = (email: string): string => {
  const trimmedEmail = email.trim();
  
  if (trimmedEmail.length === 0) {
    return "Email cannot be empty";
  }
  
  if (trimmedEmail.length > 254) {
    return "Email address is too long";
  }
  
  return "Please enter a valid email address";
};