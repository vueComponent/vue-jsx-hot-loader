module.exports = {
  preset: 'ts-jest',
  testTimeout: 30000,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
}
