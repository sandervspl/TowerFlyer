const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',

  entry: path.resolve(__dirname, '..', 'src/app.ts'),

  output: {
    path: path.resolve(__dirname, '..', 'public'),
    publicPath: '',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-0']
        },
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.ts?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(styl|css)?$/,
        loader: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  }
}