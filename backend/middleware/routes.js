var router = require('express').Router()

var auth = require('../api/auth/auth.js')
var postRouter = require('../api/post/postRouter.js')
var channel = require('../api/channel/channel.js')
var userRouter = require('../api/user/userRouter.js')
var messageRouter = require('../api/message/messageRouter.js')
var task = require('../api/task/task.js')

router.use('/auth', auth.authRouter)
router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/channel', channel.channelRouter)
router.use('/message', messageRouter)
router.use('/task', task.taskRouter)

module.exports = router