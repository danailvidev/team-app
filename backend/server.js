var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
const config = require('./config')
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// routes
var auth = require('./routes/auth.js')
var post = require('./routes/post.js')
var channel = require('./routes/channel.js')
var user = require('./routes/user.js')

mongoose.Promise = Promise // use es6 promise  DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated

app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.json())

mongoose.connect(config.mongo_url, {
    useMongoClient: true,
}, (err) => {
    if (!err) {
        console.log('db connected')
    } else {
        console.log('db err')
    }
})

app.use('/auth', auth.router)
app.use('/user', user.router)
app.use('/post', post.router)
app.use('/channel', channel.router)

var numUsers = 0;
io.on('connection', function (socket) {
    var addedUser = false;
    console.log('a user connected');

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
        console.log(data.from)
        console.log(data.content)
        // we tell the client to execute 'new message'
        socket.broadcast.emit('message', {
            username: data.from,
            message: data.content
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
        console.log('username', username)
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

server.listen(config.app_port)