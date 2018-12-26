const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const WebextensionPlugin = require("webpack-webextension-plugin")
const { name, version, description, homepage } = require("./package.json")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const VENDOR = process.env.WEB_EXT_VENDOR || "firefox"
const babelOptions = {
  presets: ["@babel/preset-react"],
}

function generateHtmlPlugins(items) {
  return items.map(
    name =>
      new HtmlPlugin({
        filename: `./${name}.html`,
        chunks: [name],
        title: `dyna-bookmarks_${name}`,
      }),
  )
}

const getDistPath = (relPath = "") => path.resolve(`dist/${VENDOR}`, relPath)
const getSrcPath = (relPath = "") => path.resolve(`./src`, relPath)

module.exports = {
  entry: {
    background: `${getSrcPath("pages")}/background/index.ts`,
    popup: `${getSrcPath("pages")}/popup/index.tsx`,
  },
  output: {
    path: getDistPath(),
    filename: "[name].js",
  },
  resolve: {
    modules: [getSrcPath(), "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  devtool: "inline-source-map",
  mode: process.env.NODE_ENV || "development",
  cache: true,
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions,
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions,
          },
        ],
      },

      // { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  plugins: [
    new CopyPlugin([
      {
        from: "./assets",
        to: getDistPath("assets"),
      },
      "LICENSE",
      "README.md",
    ]),
    ...generateHtmlPlugins(["background", "popup"]),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: "./tsconfig.json",
    }),
    new WebextensionPlugin({
      vendor: "firefox",
      autoreload: false,
      manifestDefaults: {
        name,
        version,
        description,
        homepage_url: homepage,
        manifest_version: 2,
      },
    }),
  ],
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
}
