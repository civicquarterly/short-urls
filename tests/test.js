var assert = require('assert')

try {
  var config = require('../urls.json')
} catch (e) {
  assert(false, 'urls.json must be valid JSON')
}

assert(Object.keys(config).every(function (key) {
  return startsWith(key, '/')
}), 'url keys must start with a /')


assert(Object.keys(config).map(function (x) { return config[x] }).every(function (target) {
  return startsWith(target, 'https://') || startsWith(target, 'http://')
}), 'target urls must start with a protocol')

function startsWith(str, pre) {
  return str.indexOf(pre) === 0
}

console.log('ok')