module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./tests/setup.ts', 'jest-canvas-mock'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupAfterEnv.ts'],
  verbose: true,
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
    },
  },
};
