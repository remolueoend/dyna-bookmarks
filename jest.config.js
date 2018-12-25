module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      babelConfig: "<rootDir>/.babelrc",
    },
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  clearMocks: true,
  testPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/web-ext-artifacts/",
    "<rootDir>/node_modules/",
    "<rootDir>/plopTemplates/",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  // set dynamically using `--coverage` flag when calling `yarn`:
  // collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: -511,
      branches: -402,
      lines: -448,
      functions: -242,
    },
  },
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts", // by default include all TS source files
    "<rootDir>/src/**/*.tsx", // by default include all TSX source files
    "!<rootDir>/src/**/stories/*.*", // exclude story files, including fixtures and helpers
    "!<rootDir>/src/**/tests/*.*", // *.tests.* files are excluded by default, but not helpers and fixtures
    "!<rootDir>/src/@types/**/*", // exclude TSC type definition files
    "!<rootDir>/src/**/mock*.ts*", // exclude mock files
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "identity-obj-proxy",
  },
}
