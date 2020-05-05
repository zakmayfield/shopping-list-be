require('dotenv').config()
const cors = require('cors')
const express = require('express')

const listRouter = require('../api-list/list-router')

const server = express()

server.use(express.json())
server.use(cors())

server.use('/list', listRouter)

server.get('/', (req, res) => {
  res.status(200).json({ api: 'on' })
})

module.exports = server