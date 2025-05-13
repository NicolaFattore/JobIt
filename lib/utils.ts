import { validateEmail, normalizeEmail } from './validation';

export function isValidEmail(email: string): boolean {
  return validateEmail(email);
}

/**
 * Validate email with additional domain and format checks
 * @param email - Email to validate
 * @returns Validation result with detailed feedback
 */
export function validateEmailWithDetails(email: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Basic checks
  if (!email) {
    errors.push('Email cannot be empty');
    return { isValid: false, errors };
  }

  // Trim and normalize
  const normalizedEmail = email.trim().toLowerCase();

  // Length check
  if (normalizedEmail.length < 5) {
    errors.push('Email must be at least 5 characters');
  }

  if (normalizedEmail.length > 320) {
    errors.push('Email cannot exceed 320 characters');
  }

  // Validate against RFC 5322 regex
  if (!validateEmail(normalizedEmail)) {
    errors.push('Invalid email format');
  }

  // Additional domain checks
  const [, domain] = normalizedEmail.split('@');
  if (domain) {
    // Prevent common invalid domains
    const invalidDomains = ['example.com', 'test.com'];
    if (invalidDomains.includes(domain)) {
      errors.push('Email domain is not allowed');
    }

    // Check for valid TLD
    const validTLDs = ['.com', '.org', '.net', '.edu', '.gov'];
    if (!validTLDs.some(tld => domain.endsWith(tld))) {
      errors.push('Invalid top-level domain');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
