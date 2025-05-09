module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], 
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json"
    }
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", 
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
};