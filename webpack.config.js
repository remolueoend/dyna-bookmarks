const path = require('path')
// const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// const WebExtWebpackPlugin = require('web-ext-webpack-plugin')

const PAGES_PATH = './src/pages'
const babelOptions = {
  presets: ['@babel/preset-react'],
}

function generateHtmlPlugins(items) {
  return items.map(
    name =>
      new HtmlPlugin({
        filename: `./${name}.html`,
        chunks: [name],
      }),
  )
}

module.exports = {
  entry: {
    background: `${PAGES_PATH}/background/index.ts`,
    popup: `${PAGES_PATH}/popup/index.tsx`,
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devtool: 'source-map',
  mode: process.env.NODE_ENV || 'development',
  cache: true,
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
          {
            loader: 'ts-loader',
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
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },

      // { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  plugins: [
    // new CopyPlugin([
    // {
    //    from: 'src',
    //    to: path.resolve('dist'),
    //    ignore: ['pages/**/*'],
    //  },
    // ]),
    ...generateHtmlPlugins(['background', 'popup']),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: './tsconfig.json',
    }),
    // new WebExtWebpackPlugin({ sourceDir: './dist' }),
  ],
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
}
