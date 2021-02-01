const express = require('express')

const ImagesService = require('../services/ImagesService')
const SearchService = require('../services/SearchService')

const searchRouter = express.Router()

// TODO: Consider having a validation middleware
searchRouter.get('/:searchTerm', async (req, res) => {
  const imagesService = new ImagesService()
  const searchService = new SearchService(imagesService)
  const images = await searchService.getImagesByTerm(req.params.searchTerm)
  res.status(200).json({ pictures: images })
})

module.exports = { searchRouter }
