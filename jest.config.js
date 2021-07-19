module.exports = {
  preset: 'ts-jest',
  testTimeout: 30000,
  verbose: true,
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts', 'node'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
}
