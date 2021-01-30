const redis = require('redis')

let client = null

const getRedisConnection = () => client

const connectRedis = async () => {
  client = redis.createClient()

  return new Promise((resolve, reject) => {
    client.on('ready', function () {
      console.info('Redis is ready')
      resolve(client)
    })

    client.on('error', function (error) {
      console.error(error)
      reject(error)
    })
  })
}

module.exports = {
  connectRedis,
  getRedisConnection,
}
