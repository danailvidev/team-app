var express = require('express')
var authController = require('../auth/authController.js')
var postController = require('./postController.js')
var postRouter = express.Router()

// get all posts by author id
postRouter.route('/:id')
    .get(async (req, res, next) => {
        await postController.params(req, res, next)
        await postController.getAllByAuthor(req, res)
    })
    .delete(authController.checkAuthenticated, (req, res) => {
        postController.deleteOne(req, res, next)
    })

postRouter.post('/', authController.checkAuthenticated, (req, res) => {
    postController.post(req, res)
})

module.exports = postRouter