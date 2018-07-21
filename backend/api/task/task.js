var Task = require('./taskModel.js')
var express = require('express')
var auth = require('../auth/auth.js')
var taskRouter = express.Router()
var ObjectId = require('mongodb').ObjectID;

taskRouter.route('/:id')
    .get(async (req, res) => {
        let author = req.params.id
        let tasks = await task.find({
            author
        })
        res.send(tasks)
    })
    .put((req, res) => {
        let id = req.body._id
        let content = req.body.content
        let type = req.body.type

        Task.findByIdAndUpdate(id, {
            $set: {
                content: content,
                type: type
            }
        }, (err, result) => {
            if (err) return res.send(500, {
                error: err
            })
            res.send(result)
        })
    })
    .delete(auth.checkAuthenticated, async (req, res) => {
        try {
            let id = req.params.id
            let task = await task.findByIdAndRemove(id)
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
        }, '-__v')
        res.send(tasks)
    })
    .post(auth.checkAuthenticated, (req, res) => {
        let taskData = req.body
        taskData.authorId = req.userId
        let task = new Task(taskData)

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

let task = {
    taskRouter
}

module.exports = task