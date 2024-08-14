module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/.jest/setup-tests.js"],
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/.jest/mock/fileMock.js",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^src/config/firebase$": "<rootDir>/.jest/mock/firebase.js",
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!module-to-transform|another-module).+\\.js$",
    "/node_modules/(?!firebase)/",
  ],
};
