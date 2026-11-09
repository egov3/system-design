import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  coveragePathIgnorePatterns: [
    "<rootDir>/src/interfaces",
    "<rootDir>/src/styles",
    "<rootDir>/__tests__/Mock",
  ],
  testMatch: ["**/*.test.tsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^~constants/(.*)$": "<rootDir>/src/constants/$1",
    "^~utils/(.*)$": "<rootDir>/src/utils/$1",
    "^~interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
    "~baseComponents": "<rootDir>/src/baseComponents/index.ts",
    "^~components$": "<rootDir>/src/components/index.ts",
    "^~customHooks/(.*)$": "<rootDir>/src/customHooks/$1",
    "~svg": "<rootDir>/src/svg/index.tsx",
    "^__tests__/(.*)$": "<rootDir>/__tests__/$1",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$": "<rootDir>/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
