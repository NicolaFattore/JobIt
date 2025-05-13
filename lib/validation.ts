/**
 * Validates and normalizes an email address
 * @param email - The email address to validate and normalize
 * @returns Normalized email or null if invalid
 */
export const validateAndNormalizeEmail = (email: string): string | null => {
  // Check for null, undefined, or empty string
  if (!email) return null;

  // Trim whitespace and convert to lowercase for case-insensitive comparison
  const trimmedEmail = email.trim().toLowerCase();

  // RFC 5322 Official Standard Email Validation Regex
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Validate email
  if (!emailRegex.test(trimmedEmail)) {
    return null;
  }

  return trimmedEmail;
};

/**
 * Provides a descriptive error message for invalid email
 * @param email - The email address to validate
 * @returns string with error message or null if valid
 */
export const getEmailValidationError = (email: string): string | null => {
  if (!email) return 'Email is required';
  
  const normalizedEmail = validateAndNormalizeEmail(email);
  
  if (!normalizedEmail) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

/**
 * Creates a case-insensitive database query condition for email uniqueness
 * @param email - The email to check
 * @returns MongoDB query condition for case-insensitive email check
 */
export const createCaseInsensitiveEmailQuery = (email: string): { email: RegExp } | null => {
  const normalizedEmail = validateAndNormalizeEmail(email);
  
  if (!normalizedEmail) {
    return null;
  }

  // Create a case-insensitive regex query for email uniqueness
  return { 
    email: new RegExp(`^${normalizedEmail}$`, 'i') 
  };
};