var express = require('express')
var userController = require('./userController.js')
var userRouter = express.Router()

userRouter.get('/:id', async (req, res, next) => {
    await userController.params(req, res, next, req.params.id)
    await userController.getOne(req, res)
})

userRouter.get('/', async (req, res) => {
    userController.get(req, res)
})

module.exports = userRouter