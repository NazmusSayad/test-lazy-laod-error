process.env.NODE_ENV = 'production'
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
  DEFAULT,
  CONFIG,
  makeCssRule,
  makeBabelRule,
} = require('./webpack.common')

const cssLoaders = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['postcss-preset-env'],
      },
    },
  },
]

module.exports = {
  ...DEFAULT.root,

  output: {
    ...DEFAULT.output,
    clean: true,
  },

  module: {
    rules: [
      ...DEFAULT.loaders,
      makeCssRule(cssLoaders),
      makeBabelRule({ presets: ['@babel/preset-env'] }),
    ],
  },

  plugins: [
    ...DEFAULT.plugins,

    new MiniCssExtractPlugin({
      filename: CONFIG.assestPath + '/[name].css',
    }),

    new CopyWebpackPlugin({
      patterns: [{ from: CONFIG.publicDir }],
    }),
  ],
}
