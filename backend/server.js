var express = require('express')
var app = express()
const config = require('./config/config')
var server = require('http').createServer(app)
var api = require('./middleware/routes')

// middleware 
require('./middleware/middleware')(app)

// db connect
require('./middleware/database')()

// routes
app.use('/api', api)

// socket.io
require('./middleware/socketio')(server)

server.listen(config.port || 3000)