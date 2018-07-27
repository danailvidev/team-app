var express = require('express')
var authController = require('../auth/authController.js')
var controller = require('./postController.js')
var postRouter = express.Router()

postRouter.param('id', controller.params)

// get all posts by author id - TODO: refactor
postRouter.route('/:id')
    .get(controller.getAllByAuthor)
    .delete(authController.checkAuthenticated, controller.deleteOne)

postRouter.route('/')
    .post(authController.checkAuthenticated, controller.post)

module.exports = postRouter