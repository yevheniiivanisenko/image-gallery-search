const axios = require('axios')
const HttpClient = require('./HttpClient')

const IMAGE_SERVICE_URL = `${process.env.IMAGE_SERVICE}/images`

const toFlatImageList = imagePages =>
  imagePages.reduce((list, page) => {
    return [...list, ...page.pictures]
  }, [])

class Images extends HttpClient {
  async fetchImage(imageId) {
    const uri = `${this.serviceURI}/${imageId}`

    console.info(`fetchImage: ${uri}`)

    const response = await axios.get(uri, {
      headers: {
        Authorization: `Bearer ${this.tokenManager.getToken()}`,
      },
    })
    return response.data
  }

  async fetchPageImages(page = 1) {
    const uri = `${this._SERVICE_URL}?page=${page}`

    console.log(`fetchPageImages: ${uri}`)

    this.setRequestHeader(
      'Authorization',
      `Bearer ${this._tokenManager.getToken()}`,
    )
    const response = await this._request.get(`?page=${page}`)
    return response.data
  }

  async fetchAllImages() {
    const initialPage = 1
    const {
      page: currentPage,
      pageCount: pagesTotal,
      pictures,
    } = await this.fetchPageImages(initialPage)
    const pagesPromises = []

    for (let i = currentPage + 1; i <= pagesTotal; i++) {
      pagesPromises.push(this.fetchPageImages(i))
    }

    // TODO: consider spinning requests to get image details right after a request to /images?pages={num} is fulfilled succesfully
    const pagesResponse = await Promise.all(pagesPromises)
    const imageIdList = toFlatImageList(pagesResponse)
    const imagePromises = imageIdList.map(i => this.fetchImage(i.id))
    const images = await Promise.all(imagePromises)

    return images
  }
}

module.exports = { Images }
