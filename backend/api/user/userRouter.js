var express = require('express')
var userController = require('./userController.js')
var authController = require('../auth/authController.js')
var userRouter = express.Router()

userRouter.route('/:id')
    .get(authController.checkAuthenticated, async (req, res, next) => {
        await userController.params(req, res, next)
        await userController.getOne(req, res)
    })

userRouter.route('/')
    .get(authController.checkAuthenticated, (req, res) => {
        userController.get(req, res)
    })

module.exports = userRouter