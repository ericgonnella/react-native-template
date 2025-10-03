module.exports = {
  ...require('./jest.config'),
  testMatch: ['<rootDir>/tests/native/**/*.test.{ts,tsx}'],
  displayName: 'native',
};
