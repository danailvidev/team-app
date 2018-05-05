var express = require('express')
var app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
var chalk = require('chalk')
var mongoose = require('mongoose')
const config = require('./config.json')
var server = require('http').createServer(app)
var io = require('socket.io')(server);

// routes
var auth = require('./routes/auth.js')
var post = require('./routes/post.js')
var channel = require('./routes/channel.js')
var user = require('./routes/user.js')
var messages = require('./routes/messages.js')
var task = require('./routes/task.js')

app.use(cors({
    credentials: true,
    origin: config.cors.headers
}));

app.use(bodyParser.json())

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

var numUsers = 0;
io.on('connection', function (socket) {
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {

        // we tell the client to execute 'new message'
        socket.broadcast.emit('message', {
            username: data.from.email,
            message: data.content
        });

        // save the msg to db
        messages.saveMsg(data)
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function () {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        if (addedUser) {
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });

});

server.listen(process.env.PORT || 3000)