var express = require('express')
var authController = require('../auth/authController.js')
var taskRouter = express.Router()
var controller = require('./taskController')

taskRouter.param('id', controller.params)

taskRouter.route('/:id')
    .get(authController.checkAuthenticated)
    .put(authController.checkAuthenticated, controller.updateById)
    .delete(authController.checkAuthenticated, controller.deleteById)

taskRouter.route('/')
    .get(authController.checkAuthenticated, controller.get)
    .post(authController.checkAuthenticated, controller.post)

module.exports = taskRouter