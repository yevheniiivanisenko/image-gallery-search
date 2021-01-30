const { promisify } = require('util')

const { tokenManager } = require('./service/TokenManager')
const { Images } = require('./service/Images')

const EXPIRICY_IN_MINUTES = process.env.REDIS_IMAGES_KEY_EXPIRICY

async function loadAppData(redisConnection) {
  const imagesService = new Images(tokenManager)
  const images = await imagesService.fetchPageImages()
  
  
  // const images = await imagesService.fetchAllImages()

  // caches data to redis
  // const setAsync = promisify(redisConnection.set).bind(redisConnection)
  // await setAsync(
  //   'images',
  //   JSON.stringify(images),
  //   'EX',
  //   60 * EXPIRICY_IN_MINUTES,
  // )
}

module.exports = { loadAppData }
