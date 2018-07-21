var Message = require('./messageModel.js')
var _ = require('lodash')

exports.params = function (req, res, next, id) {
    Message.findById(id)
        .then(function (message) {
            if (!message) {
                next(new Error('No message with that id'))
            } else {
                req.message = message;
                next()
            }
        }, function (err) {
            next(err)
        })
}

exports.get = function (req, res, next) {
    Message.find({}, '-__v -hash') // remove unwanted props
        .then(function (messages) {
            res.send(messages)
        }, function (err) {
            next(err)
        })
}

exports.put = function (req, res, next) {
   var message = req.message
   var update = req.body

   _.merge(message, update)

   message.save(function(err, saved){
       if(err){
           next(err)
       } else {
           res.send(saved)
       }
   })
}