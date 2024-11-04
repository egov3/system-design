import nextJest from 'next/jest';
import type { Config } from '@jest/types';

const createJestConfig = nextJest({
  dir: './'
});

const customJestConfig: Config.InitialOptions = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.tsx'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/store',
    '<rootDir>/src/stories',
  ],
  testMatch: ['**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1',
    '~constants/(.*)': '<rootDir>/src/constants/$1',
    '~customHooks/(.*)': '<rootDir>/src/customHooks/$1',
    '~customMock/(.*)': '<rootDir>/__tests__/customMock/$1',
    '~components': '<rootDir>/src/components/index.tsx',
    '~module': '<rootDir>/src/components/index.tsx',
    '~svg': '<rootDir>/src/svg/index.tsx',
    '~templates': '<rootDir>/src/templates/index.tsx',
    '~utils/(.*)': '<rootDir>/src/utils/$1'
  },
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 40,
      statements: 40
    }
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
};

export default createJestConfig(customJestConfig);
