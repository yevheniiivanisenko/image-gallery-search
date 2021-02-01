const { HttpClient } = require('../utils/HttpClient')

class TokenManagerService {
  static #LOG_LABEL = 'TokenMager:'
  static #SERVICE_URL = process.env.IMAGES_SERVICE_URL
  static #SERVICE_KEY = process.env.IMAGES_SERVICE_API_KEY
  static #httpClient = new HttpClient(this.#SERVICE_URL)
  static #token = ''

  static async loadToken() {
    console.log(`${this.#LOG_LABEL}loadToken`)
    const response = await this.#httpClient.getInstance().post(`/auth`, {
      apiKey: this.#SERVICE_KEY,
    })
    this.#token = response.data.token
  }

  static async getToken() {
    if (!this.#token) await this.loadToken()
    return this.#token
  }
}

module.exports = { TokenManagerService }
