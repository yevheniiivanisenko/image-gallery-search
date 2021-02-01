const { HttpClient } = require('./HttpClient')
const { TokenManagerService } = require('../services/TokenManagerService')

class AuthInterceptedHttpClient extends HttpClient {
  constructor(baseURL) {
    super(baseURL)
    this._configureInterceptor()
  }

  /*
   * Renew a token
   */
  _configureInterceptor() {
    this._instance.interceptors.response.use(
      response => response,
      async error => {
        const { status } = error.response
        if (status === 401) {
          await TokenManagerService.loadToken()
          const token = await TokenManagerService.getToken()
          error.config.headers['Authorization'] = `Bearer ${token}`
          return this._instance.request(error.config)
        }
        return Promise.reject(error)
      },
    )
  }
}

const SERVICE_URL = process.env.IMAGES_SERVICE_URL

module.exports = {
  AuthInterceptedHttpClient: new AuthInterceptedHttpClient(SERVICE_URL),
}
