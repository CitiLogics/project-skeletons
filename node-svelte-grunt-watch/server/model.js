const config = require('./config.js')

module.exports.getHello = function() {
  return config.constants.hello
}

module.exports.getFoo = function() {
  return config.constants.foo
}
