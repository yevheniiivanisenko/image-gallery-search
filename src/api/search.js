const { promisify } = require('util')
const express = require('express')

const { tokenManager } = require('../service/TokenManager')
const { Images } = require('../service/Images')
const { getRedisConnection } = require('../redisConnection')
const { updateAppData } = require('../middleware')

const redisConnection = getRedisConnection()
const getAsync = promisify(redisConnection.get).bind(redisConnection)

const searchRouter = express.Router()

searchRouter.use(updateAppData())

searchRouter.get('/', async (req, res) => {
  getAsync('images').then(images => {
    res.status(200).json({ data: JSON.parse(images) })
  })

  // const token = await tokenManager.getToken()
  // const imagesService = new Images(token)
  // const images = await imagesService.fetchAllImages()

  // res.status(200).json(images)
})

module.exports = { searchRouter }
