var express = require('express')
var controller = require('./userController.js')
var authController = require('../auth/authController.js')
var userRouter = express.Router()

userRouter.param('id', controller.params)

userRouter.route('/:id')
    .get(authController.checkAuthenticated, controller.getOne)

userRouter.route('/')
    .get(authController.checkAuthenticated, controller.get)

module.exports = userRouter