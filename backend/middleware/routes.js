var router = require('express').Router()

var auth = require('../routes/auth.js')
var post = require('../routes/post.js')
var channel = require('../routes/channel.js')
var user = require('../routes/user.js')
var messages = require('../routes/messages.js')
var task = require('../routes/task.js')

router.use('/auth', auth.authRouter)
router.use('/user', user.userRouter)
router.use('/post', post.postRouter)
router.use('/channel', channel.channelRouter)
router.use('/messages', messages.msgRouter)
router.use('/task', task.taskRouter)

module.exports = router