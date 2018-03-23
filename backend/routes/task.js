var Task = require('../models/Task.js')
var express = require('express')
var auth = require('./auth.js')
var taskRouter = express.Router()
var ObjectId = require('mongodb').ObjectID;

taskRouter.route('/:id')
    .get(async (req, res) => {
        var author = req.params.id
        var tasks = await task.find({
            author
        })
        res.send(tasks)
    })
    .delete(auth.checkAuthenticated, async (req, res) => {
        try {
            let id = req.params.id
            var task = await task.findByIdAndRemove(id)
            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(500)
        }
    })

taskRouter.route('/')
    .get(auth.checkAuthenticated, async (req, res) => {
        const authorId = req.userId
        let tasks = await Task.find({
            authorId: {
                $in: [ObjectId(authorId)]
            }
        })
        res.send(tasks)
    })
    .post(auth.checkAuthenticated, (req, res) => {
        var taskData = req.body
        taskData.authorId = req.userId
        var task = new Task(taskData)

        task.save((err, result) => {
            if (err) {
                console.error('saving task error')
                return res.status(500).send({
                    message: 'saving task error'
                })
            } else {
                res.status(200).send({
                    result: true,
                    id: result._id
                })
            }
        })
    })

var task = {
    taskRouter
}

module.exports = task