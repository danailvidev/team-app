var express = require('express')
var stripeRouter = express.Router()
var controller = require('./stripeController')
var authController = require('../auth/authController.js')

stripeRouter.route('/')
    .post(authController.checkAuthenticated, controller.createOrder)

stripeRouter.route('/recurring')
    .post(authController.checkAuthenticated, controller.createOrder)

module.exports = stripeRouter