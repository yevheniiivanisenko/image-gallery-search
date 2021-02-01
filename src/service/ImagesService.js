const {
  AuthInterceptedHttpClient: HttpClient,
} = require('./AuthInterceptedHttpClient')
const { TokenManager } = require('./TokenManager')

const toFlatImageList = imagePages =>
  imagePages.reduce((list, page) => {
    return [...list, ...page.pictures]
  }, [])

class ImagesService {
  #LOG_LABEL = 'ImagesService:'

  async fetchImage(imageId) {
    console.log(`${this.#LOG_LABEL}fetchImage`)
    const token = await TokenManager.getToken()
    const response = await HttpClient.getInstance().get(`/images/${imageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  }

  async fetchPageImages(page = 1) {
    console.log(`${this.#LOG_LABEL}fetchPageImages`)
    const token = await TokenManager.getToken()
    const response = await HttpClient.getInstance().get(
      `/images?page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
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

module.exports = ImagesService
