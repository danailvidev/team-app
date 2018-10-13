var router = require('express').Router()

var authRouter = require('../api/auth/authRouter.js')
var postRouter = require('../api/post/postRouter.js')
var channel = require('../api/channel/channel.js')
var userRouter = require('../api/user/userRouter.js')
var messageRouter = require('../api/message/messageRouter.js')
var taskRouter = require('../api/task/taskRouter.js')
var paypalRouter = require('../api/paypal/paypalRouter.js')
var stripeRouter = require('../api/stripe/stripeRouter')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/channel', channel.channelRouter)
router.use('/message', messageRouter)
router.use('/task', taskRouter)
// router.use('/paypal', paypalRouter)
router.use('/stripe', stripeRouter)

module.exports = router