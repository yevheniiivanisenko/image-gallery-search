const { promisify } = require('util')
const express = require('express')

const ImagesService = require('../service/ImagesService')
const { getRedisConnection } = require('../redisConnection')
const { updateAppData } = require('../middleware')

const redisConnection = getRedisConnection()
const getAsync = promisify(redisConnection.get).bind(redisConnection)

const searchRouter = express.Router()

searchRouter.use(updateAppData())

searchRouter.get('/', async (req, res) => {
  // const imagesService = new ImagesService()
  // const images = await imagesService.fetchPageImages()
  // res.status(200).json({ images })


  const images = await getAsync('images')
  if (!images) {

  }

  getAsync('images').then(images => {
    res.status(200).json({ pictures: JSON.parse(images) })
  })

  // const token = await tokenManager.getToken()
  // const imagesService = new Images(token)
  // const images = await imagesService.fetchAllImages()

  // res.status(200).json(images)
})

module.exports = { searchRouter }
