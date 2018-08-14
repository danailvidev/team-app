var express = require('express')
var paypalRouter = express.Router()
var controller = require('./paypalController')


paypalRouter.route('/')
    .post(controller.createOrder)

module.exports = paypalRouter