var Message = require('./messageModel.js')
var express = require('express')
var msgRouter = express.Router()

msgRouter.route('/')
    .get(async (req, res) => {
        try {
            var msgs = await Message.find({}, '-__v -hash') // remove unwanted props
            res.send(msgs)
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    })

msgRouter.put('/:id', (req, res) => {
    let id = req.params.id
    var updateData = req.body

    Message.findByIdAndUpdate(id, updateData, (err, result) => {
        if (err) return res.send(500, {
            error: err
        })
        res.send(result)
    })
})

var message = {
    msgRouter,
    saveMsg: (msg) => {
        var msgData = {}
        msgData.content = msg.content
        msgData.authorEmail = msg.from.email
        msgData.authorId = msg.from.userId
        msgData.dateCreated = new Date()

        var message = new Message(msgData)

        message.save((err, results) => {
            if (err) {
                console.log('saving msg error', err)
            } else {
                console.error('saved')
            }
        })
    }
}

module.exports = message