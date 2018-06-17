module.exports = function(app){
    var auth = require('../routes/auth.js')
    var post = require('../routes/post.js')
    var channel = require('../routes/channel.js')
    var user = require('../routes/user.js')
    var messages = require('../routes/messages.js')
    var task = require('../routes/task.js')
    
    app.use('/auth', auth.authRouter)
    app.use('/user', user.userRouter)
    app.use('/post', post.postRouter)
    app.use('/channel', channel.channelRouter)
    app.use('/messages', messages.msgRouter)
    app.use('/task', task.taskRouter)
}
