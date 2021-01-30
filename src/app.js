const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

const { connectRedis } = require('./redisConnection')
const { loadAppData } = require('./init')
connectRedis()
  .then(loadAppData)
  .then(() => app.emit('ready'))
  .catch(error => {
    console.error(`The server could not start due to:`)
    console.error(error)
    process.exit(1)
  })

const { searchRouter } = require('./api/search')

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/search', searchRouter)

app.on('ready', () => {
  app.listen(port, () => {
    console.log(`App is listening on port: ${port}`)
  })
})
