/**
 * Validate email format using a comprehensive regex pattern
 * @param email - Email address to validate
 * @returns boolean indicating if the email is valid
 */
export const validateEmail = (email: string): boolean => {
  // RFC 5322 Official Standard email validation regex
  // Covers most common email formats while being reasonably strict
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Check if email is undefined, null, or empty string
  if (!email) return false;
  
  // Trim whitespace and convert to lowercase for consistent validation
  const trimmedEmail = email.trim().toLowerCase();
  
  // Check length constraints (most email providers limit to ~320 characters)
  if (trimmedEmail.length > 320) return false;
  
  // Apply regex validation
  return emailRegex.test(trimmedEmail);
};

/**
 * Sanitize email by trimming and converting to lowercase
 * @param email - Email address to sanitize
 * @returns sanitized email
 */
export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
}