// @ts-check

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/**/*.test.ts?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  modulePathIgnorePatterns: ["/dist/"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  maxWorkers: 2,
  maxConcurrency: 1,
};
