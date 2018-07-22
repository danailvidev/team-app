var Message = require('./messageModel.js')
var _ = require('lodash')

const params = async (req, res, next, id) => {
    try {
        let message = await Message.findById(id)
        if (!message) {
            next(new Error('No message with that id'))
        } else {
            req.message = message;
            next()
        }
    } catch (err) {
        next(err)
    }
}

const get = async (req, res, next) => {
    try {
        let messages = await Message.find({}, '-__v -hash') // remove unwanted props
        if (messages) {
            res.send(messages)
        } else {
            res.send([])
        }
    } catch (err) {
        next(err)
    }

}

const put = function (req, res, next) {
    var message = req.message
    var update = req.body

    _.merge(message, update)

    message.save(function (err, saved) {
        if (err) {
            next(err)
        } else {
            res.send(saved)
        }
    })
}

const saveMsg = (msg) => {
    var msgData = {}
    msgData.content = msg.content
    msgData.authorEmail = msg.from.email
    msgData.authorId = msg.from.userId
    msgData.dateCreated = new Date()

    var message = new Message(msgData)

    message.save((err, results) => {
        if (err) {
            // TODO: log the error in db
            console.log('saving msg error', err)
        } 
    })
}

var messageController = {
    params,
    get,
    put,
    saveMsg
}

module.exports = messageController