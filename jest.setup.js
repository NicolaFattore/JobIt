// Optional: Add any global test setup configurations here
// For example, mocking global objects or setting up test environment

// If using fetch in tests
global.fetch = require('node-fetch');

// Optional: Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});