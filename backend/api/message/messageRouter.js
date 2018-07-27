var express = require('express')
var controller = require('./messageController.js')
var messageRouter = express.Router()

messageRouter.param('id', controller.params)

messageRouter.route('/')
    .get(controller.get)

messageRouter.route('/:id')
    .put(controller.put)

module.exports = messageRouter