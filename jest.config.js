module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^~constants/(.*)$": "<rootDir>/src/constants/$1",
    "^~utils/(.*)$": "<rootDir>/src/utils/$1",
    "^~interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
    "^~components/(.*)$": "<rootDir>/src/components/$1",
    "^~styles/(.*)$": "<rootDir>/src/styles/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};