/**
 * Validates email format using a comprehensive regex pattern
 * @param email - Email address to validate
 * @returns boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  // Comprehensive email regex that follows RFC 5322 standard
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Check if email is defined, not empty, and matches the regex pattern
  return !!email && email.trim().length > 0 && emailRegex.test(email.trim());
};

/**
 * Provides a descriptive error message for invalid email formats
 * @param email - Email address to validate
 * @returns Error message or null if email is valid
 */
export const getEmailValidationError = (email: string): string | null => {
  if (!email || email.trim().length === 0) {
    return 'Email address is required';
  }
  
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address (e.g., example@domain.com)';
  }
  
  return null;
};