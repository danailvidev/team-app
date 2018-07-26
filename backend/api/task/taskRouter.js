var express = require('express')
var authController = require('../auth/authController.js')
var taskRouter = express.Router()
var taskController = require('./taskController')

taskRouter.route('/:id')
    .get(authController.checkAuthenticated, async (req, res, next) => {
        //
    })
    .put(authController.checkAuthenticated, (req, res) => {
        taskController.updateById(req, res)
    })
    .delete(authController.checkAuthenticated, (req, res) => {
        taskController.deleteById(req, res)
    })

taskRouter.route('/')
    .get(authController.checkAuthenticated, (req, res) => {
        taskController.get(req, res)
    })
    .post(authController.checkAuthenticated, (req, res) => {
        taskController.post(req, res)
    })

module.exports = taskRouter