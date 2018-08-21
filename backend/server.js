// var fs = require('fs');
// var privateKey  = fs.readFileSync('./key.txt', 'utf8');
// var certificate = fs.readFileSync('./crt.txt', 'utf8');
// var credentials = {key: privateKey, cert: certificate};
var express = require('express')
var app = express()
const config = require('./config/config')
var httpServer = require('http').createServer(app)
// var httpsServer = require('https').createServer(credentials, app)
var api = require('./middleware/routes')

// middleware 
require('./middleware/middleware')(app)

// db connect
require('./middleware/database')()

// routes
app.use('/api', api)

// socket.io
require('./middleware/socketio')(httpServer)

httpServer.listen(config.port || 3000)
// httpsServer.listen(8443)