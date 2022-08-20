module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  clearMocks: true,
  testMatch: ['<rootDir>/**/*.test.ts'],
  testEnvironment: 'jsdom',
};
