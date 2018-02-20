var Message = require('../models/Message.js')

var messages = {
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

module.exports = messages