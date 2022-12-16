module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        tsConfig: 'tsconfig.json',
      },
    ],
  },
  clearMocks: true,
  testMatch: ['<rootDir>/**/*.test.ts'],
  testEnvironment: 'jsdom',
};
