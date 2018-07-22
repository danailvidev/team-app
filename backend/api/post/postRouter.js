var express = require('express')
var auth = require('../auth/auth.js')
var postController = require('./postController.js')
var postRouter = express.Router()

// get all posts by author id
postRouter.route('/:id')
    .get(async (req, res, next) => {
        await postController.params(req, res, next)
        await postController.getAllByAuthor(req, res)
    })
    .delete(auth.checkAuthenticated, (req, res) => {
        postController.deleteOne(req, res, next)
    })

postRouter.post('/', auth.checkAuthenticated, (req, res) => {
    postController.post(req, res, next)
})

module.exports = postRouter