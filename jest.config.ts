import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^~constants/(.*)$": "<rootDir>/src/constants/$1",
    "^~utils/(.*)$": "<rootDir>/src/utils/$1",
    "^~interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
    "~baseComponents": "<rootDir>/src/baseComponents/index.ts",
    "^~components$": "<rootDir>/src/components/index.ts",
    "~svg": "<rootDir>/src/svg/index.tsx",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
