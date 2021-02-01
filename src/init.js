const ImagesService = require('./services/ImagesService')
const { Cache } = require('./utils/Cache')

const EXPERATION_TIME_IN_MINUTES = process.env.CACHE_EXPERATION_TIME_IN_MINUTES

async function loadAppData() {
  const imagesService = new ImagesService()
  const images = await imagesService.fetchAllImages()
  await Cache.save('images', JSON.stringify(images), 60 * EXPERATION_TIME_IN_MINUTES)
}

module.exports = { loadAppData }
