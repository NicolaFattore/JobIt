/**
 * Comprehensive email validation function
 * @param email - Email address to validate
 * @returns boolean indicating if the email is valid
 */
export const validateEmail = (email: string): boolean => {
  // If email is undefined or null, return false
  if (!email) return false;

  // Trim and convert to lowercase
  const trimmedEmail = email.trim().toLowerCase();
  
  // Check length constraints
  if (trimmedEmail.length < 5 || trimmedEmail.length > 320) return false;

  // Comprehensive email validation regex
  // Follows RFC 5322 standard with some practical constraints
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Additional checks
  const [localPart, domainPart] = trimmedEmail.split('@');
  
  // Validate local and domain parts
  if (!localPart || !domainPart) return false;
  if (localPart.length > 64 || domainPart.length > 255) return false;
  
  // Must contain at least one dot in domain
  if (!domainPart.includes('.')) return false;
  
  // Final regex test
  return emailRegex.test(trimmedEmail);
};

/**
 * Sanitize email by trimming and converting to lowercase
 * @param email - Email address to sanitize
 * @returns sanitized email
 */
export const sanitizeEmail = (email: string): string => {
  return email ? email.trim().toLowerCase() : '';
};

/**
 * Get detailed email validation error
 * @param email - Email to validate
 * @returns Error message or null if valid
 */
export const getEmailValidationError = (email: string): string | null => {
  if (!email) return 'Email is required';
  
  const trimmedEmail = email.trim().toLowerCase();
  
  if (trimmedEmail.length < 5) return 'Email is too short';
  if (trimmedEmail.length > 320) return 'Email is too long';
  
  if (!trimmedEmail.includes('@')) return 'Email must contain @ symbol';
  
  const [localPart, domainPart] = trimmedEmail.split('@');
  
  if (!localPart) return 'Email is missing local part';
  if (!domainPart) return 'Email is missing domain part';
  
  if (localPart.length > 64) return 'Local part of email is too long';
  if (domainPart.length > 255) return 'Domain part of email is too long';
  
  if (!domainPart.includes('.')) return 'Domain must contain at least one dot';
  
  return validateEmail(email) ? null : 'Invalid email format';
};