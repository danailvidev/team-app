// var fs = require('fs');
// var privateKey  = fs.readFileSync('./key.txt', 'utf8');
// var certificate = fs.readFileSync('./crt.txt', 'utf8');
// var credentials = {key: privateKey, cert: certificate};
var express = require('express')
var app = express()
const config = require('./config/config')
var httpServer = require('http').createServer(app)
// var httpsServer = require('https').createServer(credentials, app)
// var passport = require('passport');
// var session = require('express-session');
var api = require('./middleware/routes')

// middleware 
require('./middleware/middleware')(app)

// db connect
require('./middleware/database')()

// app.use(session({
//     secret: 's3cr3t',
//     resave: true,
//     saveUninitialized: true,
//     store: new session({
//         storage: 'mongodb',
//         instance: mongoose, // optional
//         host: 'localhost', // optional
//         port: 27017, // optional
//         db: 'test', // optional
//         collection: 'sessions', // optional
//         expire: 86400 // optional
//     })
//   }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });

//   passport.deserializeUser(function(user, done) {
//     done(null, user);
//   });

// routes
app.use('/api', api)

// socket.io
require('./middleware/socketio')(httpServer)

httpServer.listen(config.port || 3000)
// httpsServer.listen(8443)