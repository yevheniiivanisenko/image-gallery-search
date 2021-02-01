const { Cache } = require('../utils/Cache')

class SearchService {
  #EXPERATION_TIME_IN_MINUTES = process.env.CACHE_EXPERATION_TIME_IN_MINUTES
  #imagesService

  constructor(imagesService) {
    this.#imagesService = imagesService
  }

  async _getImages() {
    const cachedImages = await Cache.get('images')
    if (cachedImages) return JSON.parse(cachedImages)

    const images = await this.#imagesService.fetchAllImages()
    await Cache.save('images', JSON.stringify(images), 60 * this.#EXPERATION_TIME_IN_MINUTES)
    return images
  }

  async getImagesByTerm(term) {
    const images = await this._getImages()
    const loweredCaseTerm = term.toLocaleLowerCase()
    const filteredImages = images.filter(i => {
      const metaText = `${i.author}${i.camera}${i.tags}`.toLocaleLowerCase()
      return metaText.indexOf(loweredCaseTerm) !== -1
    })
    return filteredImages
  }
}

module.exports = SearchService
