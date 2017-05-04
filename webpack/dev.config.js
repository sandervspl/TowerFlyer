const _ = require('lodash');
const base = require('./base.config.js');
const path = require('path');

module.exports = _.assign({}, base, {
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'public'),
    // hot: true,
    inline: true
  },
})
