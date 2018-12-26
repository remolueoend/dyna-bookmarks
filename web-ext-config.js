module.exports = {
  ignoreFiles: [
    "yarn.lock",
    "src",
    "*.log",
    ".vscode",
    ".gitignore",
    ".prettierrc",
    "tsconfig.json",
    "tslint.json",
    "webpack.config.js",
    "web-ext-config.js",
    "package.json",
    "jest.config.js",
    "jest.setup.js",
    ".babelrc",
    "__mocks__",
    "plopfile",
    "plop-templates",
    "coverage",
  ],
  sourceDir: "./dist/firefox",
  build: {
    overwriteDest: true,
  },
  run: {
    startUrl: ["about:debugging"],
  },
}
