module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  bail: 1,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/database/**',
    '!src/app/models/*',
    '!src/app/repositories/*',
    '!src/app/controllers/index.ts',
    '!src/app/config/*',
    '!src/app/db/*',
  ],
  testRegex: './*/tests/.*.spec.ts$',
  rootDir: '.',
}
