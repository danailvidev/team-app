var express = require('express')
var app = express()
var chalk = require('chalk')
var mongoose = require('mongoose')
const config = require('./config.json')
var server = require('http').createServer(app)

// routes
var auth = require('./routes/auth.js')
var post = require('./routes/post.js')
var channel = require('./routes/channel.js')
var user = require('./routes/user.js')
var messages = require('./routes/messages.js')
var task = require('./routes/task.js')

require('./middleware/middleware')(app)

//#region Connect to MongoDB.

mongoose.Promise = Promise // use es6 promise  DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated

mongoose.connect(config.mlabCom, {
    useMongoClient: true,
}, (err) => {
    if (!err) {
        console.log(chalk.underline.green.bold('MongoDB connected'))
    } else {
        console.error(err);
        console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
        process.exit();
    }
}) 

//#endregion

app.use('/auth', auth.authRouter)
app.use('/user', user.userRouter)
app.use('/post', post.postRouter)
app.use('/channel', channel.channelRouter)
app.use('/messages', messages.msgRouter)
app.use('/task', task.taskRouter)

require('./middleware/socketio')(server)

server.listen(config.port || 3000)