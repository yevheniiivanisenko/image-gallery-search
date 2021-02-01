const { promisify } = require('util')

const { getRedisConnection } = require('./redisConnection')
const ImagesService = require('./service/ImagesService')

const EXPIRICY_IN_MINUTES = process.env.REDIS_IMAGES_KEY_EXPIRICY

async function loadAppData() {
  const imagesService = new ImagesService()
  const images = await imagesService.fetchAllImages()

  // caches data to redis
  const connection = getRedisConnection()
  const setAsync = promisify(connection.set).bind(connection)
  await setAsync(
    'images',
    JSON.stringify(images),
    'EX',
    60 * EXPIRICY_IN_MINUTES,
  )
}

module.exports = { loadAppData }
