import { isValidEmail } from '../lib/utils';

function runEmailValidationTests() {
  const validEmails = [
    'user@example.com',
    'firstname.lastname@example.com',
    'user+tag@example.com',
    'user123@example.co.uk',
    'user-name@example.org'
  ];

  const invalidEmails = [
    '',
    'invalid-email',
    'invalid@email',
    '@missing-username.com',
    'missing-domain@.com',
    'multiple@@at.com',
    'spaces not allowed@email.com',
    'very.extremely.very.extremely.very.extremely.long.email.address.that.exceeds.reasonable.length@example.com'
  ];

  console.log('Starting Email Validation Tests');

  // Test valid emails
  console.log('\nTesting Valid Emails:');
  validEmails.forEach(email => {
    const result = isValidEmail(email);
    console.log(`${email}: ${result ? 'PASS' : 'FAIL'}`);
    if (!result) throw new Error(`Failed to validate valid email: ${email}`);
  });

  // Test invalid emails
  console.log('\nTesting Invalid Emails:');
  invalidEmails.forEach(email => {
    const result = isValidEmail(email);
    console.log(`${email}: ${!result ? 'PASS' : 'FAIL'}`);
    if (result) throw new Error(`Failed to invalidate email: ${email}`);
  });

  console.log('\nAll Email Validation Tests Passed Successfully! 🎉');
}

runEmailValidationTests();