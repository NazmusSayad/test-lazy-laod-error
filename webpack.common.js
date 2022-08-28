const HtmlWebpackPlugin = require('html-webpack-plugin')

const CONFIG = {
  build: __dirname + '/build',
  publicDir: __dirname + '/public',
  mainJS: __dirname + '/src/index.js',
  template: __dirname + '/src/index.html',
  publicPath: '/',
  assestPath: 'static',
  cssRegex: /\.(c|sc|sa)ss$/i,
  cssModuleRegex: /\.module\.\w+$/i,
}

class InterpolateHtmlPlugin {
  constructor(htmlWebpackPlugin, replacements) {
    this.htmlWebpackPlugin = htmlWebpackPlugin
    this.replacements = replacements
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('InterpolateHtmlPlugin', compilation => {
      this.htmlWebpackPlugin
        .getHooks(compilation)
        .afterTemplateExecution.tap('InterpolateHtmlPlugin', data => {
          Object.keys(this.replacements).forEach(key => {
            const value = this.replacements[key]
            data.html = data.html.replace(new RegExp(`%${key}%/`, 'g'), value)
          })
        })
    })
  }
}

const DEFAULT = {
  root: {
    mode: process.env.NODE_ENV,

    entry: {
      index: CONFIG.mainJS,
    },

    resolve: {
      extensions: ['.js', '.mjs', '.jsx', '.json', '.wasm'],
    },
  },

  output: {
    path: CONFIG.build,
    filename: CONFIG.assestPath + '/[name].js',
    assetModuleFilename: CONFIG.assestPath + '/assest/[name]-[id][ext]',
    publicPath: CONFIG.publicPath,
  },

  loaders: [
    {
      test: /\.(htm|html)$/i,
      loader: 'html-loader',
    },

    {
      test: /\.(png|jpg|jpeg|gif|webp|webm|mp3|mp4)$/i,
      type: 'asset/resource',
    },

    {
      test: /\.(svg|txt)$/i,
      type: 'asset/source',
    },
  ],

  plugins: [
    new HtmlWebpackPlugin({
      template: CONFIG.template,
    }),

    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: CONFIG.publicPath,
    }),
  ],
}

const makeCssRule = (loaders = []) => {
  const cssLoaders = {
    test: CONFIG.cssRegex,
    use: [...loaders, 'sass-loader'],
  }

  cssLoaders.use[cssLoaders.use.indexOf('css-loader')] = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName:
          process.env.NODE_ENV === 'development'
            ? '[local]([name])[hash:base64:5]'
            : '[hash:base64]',
        auto: true,
        // auto: CONFIG.cssModuleRegex,
      },
    },
  }

  return cssLoaders
}

const makeBabelRule = ({ presets = [], plugins = [] }) => {
  return {
    test: /\.(js|mjs|jsx)$/i,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
          ...presets,
        ],
        plugins: [...plugins],
      },
    },
  }
}

module.exports = {
  DEFAULT,
  CONFIG,
  makeCssRule,
  makeBabelRule,
}
