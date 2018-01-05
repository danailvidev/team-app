var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()

// routes
var auth = require('./routes/auth.js')
var post = require('./routes/post.js')
var channel = require('./routes/channel.js')
var user = require('./routes/user.js')

mongoose.Promise = Promise // use es6 promise  DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated

app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json())

mongoose.connect('mongodb://dbadmin:restPass@ds159845.mlab.com:59845/restaurant', {
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

app.listen(process.env.PORT || 3000)