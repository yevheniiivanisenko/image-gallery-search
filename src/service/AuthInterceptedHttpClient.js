const { HttpClient } = require('./HttpClient')
const { TokenManager } = require('./TokenManager')

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
          await TokenManager.loadToken()
          const token = await TokenManager.getToken()
          error.config.headers['Authorization'] = `Bearer ${token}`
          return this._instance.request(error.config)
        }
        return Promise.reject(error)
      },
    )
  }
}

const SERVICE_URL = process.env.IMAGE_SERVICE_URL

module.exports = {
  AuthInterceptedHttpClient: new AuthInterceptedHttpClient(SERVICE_URL),
}
