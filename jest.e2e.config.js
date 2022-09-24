// @ts-check

/** @type {import("jest").Config} */
module.exports = {
  preset: "jest-puppeteer",
  testMatch: ["<rootDir>/**/*.e2e.ts?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  modulePathIgnorePatterns: ["/dist/"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transformIgnorePatterns: [
    "/dist/",
    "<rootDir>/node_modules/@jest",
    "signal-exit",
  ],
  transform: {
    "^.+\\.tsx?$": "@swc/jest",
  },
  maxWorkers: 1,
  maxConcurrency: 1,
};
