const { promisify } = require('util')

const { getRedisConnection } = require('../redisConnection')

class Cache {
  static async save(key, dataString, expiresIn) {
    const connection = getRedisConnection()
    const setAsync = promisify(connection.set).bind(connection)
    await setAsync(key, dataString, 'EX', 60 * expiresIn)
  }

  static async get(key) {
    const connection = getRedisConnection()
    const getAsync = promisify(connection.get).bind(connection)
    return await getAsync(key)
  }
}

module.exports = { Cache }
