/**
 * Comprehensive email validation function
 * @param email - Email address to validate
 * @returns boolean indicating if the email is valid
 */
export const validateEmail = (email: string): boolean => {
  // More comprehensive email validation regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Comprehensive validation checks
  if (!email) return false;
  
  // Trim and convert to lowercase
  const trimmedEmail = email.trim().toLowerCase();
  
  // Length constraints (most email providers limit to ~320 characters)
  if (trimmedEmail.length < 5 || trimmedEmail.length > 320) return false;
  
  // Additional format checks
  if (!trimmedEmail.includes('@')) return false;
  
  // Split email into local and domain parts
  const [localPart, domainPart] = trimmedEmail.split('@');
  
  // Check local part and domain part constraints
  if (!localPart || !domainPart) return false;
  if (localPart.length > 64 || domainPart.length > 255) return false;
  
  // Regex validation
  return emailRegex.test(trimmedEmail);
};

/**
 * Sanitize email by trimming and converting to lowercase
 * @param email - Email address to sanitize
 * @returns sanitized email
 */
export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

/**
 * Extract error message for invalid email
 * @param email - Email address to validate
 * @returns error message or null if valid
 */
export const getEmailValidationError = (email: string): string | null => {
  if (!email) return 'Email is required';
  
  const trimmedEmail = email.trim().toLowerCase();
  
  if (trimmedEmail.length < 5) return 'Email is too short';
  if (trimmedEmail.length > 320) return 'Email is too long';
  
  if (!trimmedEmail.includes('@')) return 'Invalid email format';
  
  const [localPart, domainPart] = trimmedEmail.split('@');
  
  if (!localPart || !domainPart) return 'Invalid email format';
  if (localPart.length > 64) return 'Local part of email is too long';
  if (domainPart.length > 255) return 'Domain part of email is too long';
  
  return validateEmail(email) ? null : 'Invalid email format';
};