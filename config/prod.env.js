'use strict'
var conf = require('../src/configuration/export')
module.exports = {
  NODE_ENV: '"production"',
  config: `${conf.release}`
}
