/**
 * Comprehensive email validation with detailed results
 * Follows RFC 5322 standards with additional security checks
 */
export interface EmailValidationResult {
  isValid: boolean;
  errors: string[];
  normalizedEmail?: string;
}

export const validateEmail = (email: string): EmailValidationResult => {
  // Initialize validation result
  const result: EmailValidationResult = {
    isValid: false,
    errors: []
  };

  // Trim and normalize email
  const normalizedEmail = email.trim().toLowerCase();
  result.normalizedEmail = normalizedEmail;

  // Check for empty email
  if (!normalizedEmail) {
    result.errors.push('Email cannot be empty');
    return result;
  }

  // Comprehensive RFC 5322 compliant regex with additional checks
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // Validation checks
  if (!emailRegex.test(normalizedEmail)) {
    result.errors.push('Invalid email format');
    return result;
  }

  // Length checks
  if (normalizedEmail.length > 254) {
    result.errors.push('Email is too long (max 254 characters)');
    return result;
  }

  // Split local and domain parts
  const [localPart, domainPart] = normalizedEmail.split('@');
  
  // Local part length check (max 64 characters)
  if (localPart.length > 64) {
    result.errors.push('Local part of email is too long (max 64 characters)');
    return result;
  }

  // Domain part length check
  if (domainPart.length > 253) {
    result.errors.push('Domain part of email is too long (max 253 characters)');
    return result;
  }

  // Additional domain validation
  const domainParts = domainPart.split('.');
  if (domainParts.some(part => part.length > 63)) {
    result.errors.push('Domain segment is too long (max 63 characters)');
    return result;
  }

  // Validate top-level domain
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2 || tld.length > 63) {
    result.errors.push('Invalid top-level domain');
    return result;
  }

  // If no errors, mark as valid
  result.isValid = result.errors.length === 0;
  return result;
};