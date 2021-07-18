module.exports = {
  preset: 'ts-jest',
  testTimeout: 30000,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
}
