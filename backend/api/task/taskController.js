var Task = require('./taskModel.js')
var ObjectId = require('mongodb').ObjectID

const params = async (req, res, next) => {
    try {
        var author = req.params.id
        console.log(author)
        var tasks = await Task.find({
            author
        })
        if (!tasks) {
            next(new Error('No tasks with that id'))
        } else {
            req.tasks = tasks;
            next()
        }
    } catch (err) {
        next(err)
        console.log(error)
        res.sendStatus(500)
    }
}

const getByAuthorId = async (req, res) => {
    let tasks = req.tasks
    res.send(tasks)
}

const get = async (req, res) => {
    const authorId = req.userId
    let tasks = await Task.find({
        authorId: {
            $in: [ObjectId(authorId)]
        }
    }, '-__v')
    res.send(tasks)
}

const post = async (req, res) => {
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
}

const updateById = async (req, res) => {
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
}

const deleteById = async (req, res) => {
    try {
        let id = req.params.id
        let task = await task.findByIdAndRemove(id)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
}


let taskController = {
    params,
    get,
    post,
    updateById,
    deleteById,
    getByAuthorId
}

module.exports = taskController