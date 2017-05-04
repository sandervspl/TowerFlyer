if(process.env.NODE_ENV === 'production') {
  console.log('PRODUCTION');
  module.exports = require('./webpack/prod.config.js')
} else {
  console.log('DEV SERVER STARTING');
  module.exports = require('./webpack/dev.config.js')
}
