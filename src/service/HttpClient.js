const axios = require('axios')

class HttpClient {
  _SERVICE_URL = process.env.IMAGE_SERVICE_URL
  _request
  _tokenManager

  constructor(tokenManager) {
    this._tokenManager = tokenManager
    this._request = axios.create({
      baseURL: this._SERVICE_URL,
      timeout: 10000,
    })
  }

  getInstance() {
    return this._request
  }

  setRequestHeader(key, value) {
    this._request.defaults.headers[key] = value
  }
}

module.exports = HttpClient
