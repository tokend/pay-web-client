const merge = require('webpack-merge')
const env = require('./default.env')

module.exports = merge(env, {
  NODE_ENV: '"dev"',
  HORIZON_SERVER: '"https://api.pay.tokend.io"',
  FILE_STORAGE: '"https://storage.pay.tokend.io"',
  NETWORK_PASSPHRASE: '"pay Staging Network!"'
})
