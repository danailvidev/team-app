var express = require('express')
var messageController = require('./messageController.js')
var messageRouter = express.Router()

messageRouter.route('/')
    .get(async (req, res, next) => {
        messageController.get(req, res, next)
    })

messageRouter.put('/:id', async (req, res, next) => {
    await messageController.params(req, res, next, req.params.id)
    await messageController.put(req, res, next)
})

module.exports = messageRouter