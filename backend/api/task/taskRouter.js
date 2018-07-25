var express = require('express')
var auth = require('../auth/auth.js')
var taskRouter = express.Router()
var taskController = require('./taskController')

taskRouter.route('/:id')
    .get(auth.checkAuthenticated, async (req, res, next) => {
        //
    })
    .put(auth.checkAuthenticated, (req, res) => {
        taskController.updateById(req, res)
    })
    .delete(auth.checkAuthenticated, (req, res) => {
        taskController.deleteById(req, res)
    })

taskRouter.route('/')
    .get(auth.checkAuthenticated, (req, res) => {
        taskController.get(req, res)
    })
    .post(auth.checkAuthenticated, (req, res) => {
        taskController.post(req, res)
    })

module.exports = taskRouter