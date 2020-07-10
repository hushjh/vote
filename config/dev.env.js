'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
var conf = require('../src/configuration/export')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  config: `${conf.dev}`
})
