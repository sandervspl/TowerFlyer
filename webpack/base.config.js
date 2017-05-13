const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: path.resolve(__dirname, '..', 'src/app.ts'),

  output: {
    path: path.resolve(__dirname, '..', 'public'),
    publicPath: '',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
          typeCheck: true,
        }
      },
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
        test: /\.(gif|png|jpe?g|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  }
};