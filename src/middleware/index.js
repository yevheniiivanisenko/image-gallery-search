const { promisify } = require('util')
const { getRedisConnection } = require('../redisConnection')
const { loadAppData } = require('../init')

const redisConnection = getRedisConnection()
const getAsync = promisify(redisConnection.get).bind(redisConnection)

exports.updateAppData = function () {
  return function (req, res, next) {
    getAsync('images').then(images => {
      if (images) return next()
      return loadAppData(redisConnection).then(next)
    })
  }
}
