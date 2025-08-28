/**
 * Validates email format according to RFC 5322 standard
 * @param email - The email address to validate
 * @returns Validated and normalized email or null if invalid
 */
export const validateEmail = (email: string | null | undefined): string | null => {
  // Check for null or undefined
  if (!email) return null;

  // Trim and convert to lowercase for case-insensitive comparison
  const trimmedEmail = email.trim().toLowerCase();

  // RFC 5322 compliant regex (with some additional constraints)
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Validate email format
  if (!emailRegex.test(trimmedEmail)) return null;

  // Additional length checks
  if (trimmedEmail.length < 5 || trimmedEmail.length > 320) return null;

  // Split email into local part and domain
  const [localPart, domain] = trimmedEmail.split('@');

  // Additional domain validation
  const domainParts = domain.split('.');
  if (domainParts.length < 2 || domainParts.some(part => part.length === 0)) return null;

  // Return normalized (lowercase) email
  return trimmedEmail;
};

/**
 * Checks if an email is unique (case-insensitive)
 * @param email - The email to check
 * @param existingEmails - Array of existing emails
 * @returns boolean indicating if the email is unique
 */
export const isEmailUnique = (email: string, existingEmails: string[]): boolean => {
  const normalizedEmail = validateEmail(email);
  if (!normalizedEmail) return false;

  return !existingEmails.some(existingEmail => 
    validateEmail(existingEmail)?.toLowerCase() === normalizedEmail.toLowerCase()
  );
};