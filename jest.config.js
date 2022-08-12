// @ts-check

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/**/*.test.ts?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  modulePathIgnorePatterns: ["/dist/"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
      jsx: "react-jsx",
    },
  },
  maxWorkers: 2,
  maxConcurrency: 1,
};
