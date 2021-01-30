const axios = require('axios')

class TokenManager {
  #token = 'test'
  #AUTH_SERVICE_URL = `${process.env.IMAGE_SERVICE}/auth`
  #SERVICE_KEY= process.env.IMAGE_SERVICE_API_KEY
  #LOG_LABEL = 'TokenManager:'

  async loadToken() {
    console.log(`${this.#LOG_LABEL} is loading token from ${this.#AUTH_SERVICE_URL}`)
    const response = await axios.post(this.#AUTH_SERVICE_URL, {
      apiKey: this.#SERVICE_KEY,
    })
    this.#token = response.data.token
  }

  getToken() {
    return this.#token
  }
}

module.exports = { tokenManager: new TokenManager() }
