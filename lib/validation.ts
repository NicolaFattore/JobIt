/**
 * Validates an email address format
 * @param email - The email address to validate
 * @returns boolean indicating whether the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  // RFC 5322 Official Standard Email Validation Regex
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Check for null, undefined, or empty string
  if (!email) return false;
  
  // Trim whitespace and validate
  return emailRegex.test(email.trim());
};

/**
 * Provides a descriptive error message for invalid email
 * @param email - The email address to validate
 * @returns string with error message or null if valid
 */
export const getEmailValidationError = (email: string): string | null => {
  if (!email) return 'Email is required';
  
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
};