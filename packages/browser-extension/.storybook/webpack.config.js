const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const path = require("path")

const {
  devtool,
  module: wpModule,
  plugins,
  resolve,
} = require("../webpack.config")

module.exports = (baseConfig, env, defaultConfig) => ({
  ...defaultConfig,
  devtool,
  resolve,
  module: wpModule,
  plugins: [
    ...defaultConfig.plugins,
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, "../tsconfig.json"),
    }),
  ],
})
