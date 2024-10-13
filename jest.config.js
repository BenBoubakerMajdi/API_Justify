/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/src/test/**/*.test.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};