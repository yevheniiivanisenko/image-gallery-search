const { HttpClient } = require('./HttpClient')

const LOG_LABEL = 'magesService'

class TokenManager {
  static #SERVICE_URL = process.env.IMAGE_SERVICE_URL
  static #SERVICE_KEY = process.env.IMAGE_SERVICE_API_KEY
  static #httpClient = new HttpClient(this.#SERVICE_URL)
  static #token = ''
  static #LOG_LABEL = 'TokenMager:'

  static async loadToken() {
    console.log(`${this.#LOG_LABEL}loadToken`)
    const response = await this.#httpClient.getInstance().post(`/auth`, {
      apiKey: this.#SERVICE_KEY,
    })
    this.#token = response.data.token
  }

  static async getToken() {
    // loadToken in case it has not been loaded yet
    if (!this.#token) await this.loadToken()
    return this.#token
  }
}

module.exports = { TokenManager }
