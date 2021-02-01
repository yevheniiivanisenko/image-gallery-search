const axios = require('axios')

class HttpClient {
  _baseURL = ''
  _instance = null

  constructor(baseURL) {
    this._baseURL = baseURL
    this._instance = axios.create({
      baseURL: this._baseURL,
      timeout: 5000,
    })
  }

  getInstance() {
    return this._instance
  }
}

module.exports = { HttpClient }
