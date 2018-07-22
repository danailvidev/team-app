var Message = require('./messageModel.js')
var express = require('express')
var messageController = require('./messageController.js')
var messageRouter = express.Router()

messageRouter.route('/')
    .get(async (req, res, next) => {
        messageController.get(req, res, next)
    })

messageRouter.put('/:id', (req, res, next) => {
    messageController.params(req, res, next, req.params.id)
    messageController.put(req, res, next)
})

module.exports = messageRouter