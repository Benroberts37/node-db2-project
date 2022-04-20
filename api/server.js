const express = require("express")

const carsRouter = require('./cars/cars-router')

const server = express()

server.use(express.json())
server.use('/api/cars', carsRouter)

// DO YOUR MAGIC

module.exports = server