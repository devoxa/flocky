module.exports = {
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }],
  },
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*',
    '!<rootDir>/src/benchmarkHelper.ts',
    '!<rootDir>/src/generateDocs.ts',
    '!<rootDir>/src/parseModules.ts',
    '!<rootDir>/src/testHelpers.ts',
    '!<rootDir>/src/typeHelpers.ts',
    '!<rootDir>/src/**/*.benchmark.ts',
  ],
  coverageThreshold: { global: { branches: 100, functions: 100, lines: 100, statements: 100 } },
}
