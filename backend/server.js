var express = require('express')
var app = express()
const config = require('./config.json')
var server = require('http').createServer(app)

// middleware 
require('./middleware/middleware')(app)

// db connect
require('./middleware/database')()

// routes
require('./middleware/routes')(app)

// socket.io
require('./middleware/socketio')(server)

server.listen(config.port || 3000)