var express = require('express')
var stripeRouter = express.Router()
var controller = require('./stripeController')


stripeRouter.route('/')
    .post(controller.createOrder)

module.exports = stripeRouter