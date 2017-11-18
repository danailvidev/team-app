var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var jwt = require('jwt-simple')
var app = express()

var User = require('./models/User.js')
var Post = require('./models/Post.js')
var auth = require('./auth.js')

mongoose.Promise = Promise // use es6 promise  DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated

app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json())



app.get('/posts/:id', async(req, res) => {
    var author = req.params.id
    var posts = await Post.find({
        author
    })
    res.send(posts)
})

app.post('/post', auth.checkAuthenticated, (req, res) => {
    var postData = req.body
    postData.author = req.userId
    postData.dateCreated = new Date()

    var post = new Post(postData)

    post.save((err, results) => {
        if (err) {
            console.error('saving post error')
            return res.status(500).send({
                message: 'saving post error'
            })
        } else {
            res.status(200).send(true)
        }
    })
})

app.get('/user/:id', async(req, res) => {
    try {
        var user = await User.findById({
            _id: req.params.id
        }, '-password -__v') // remove unwanted props
        res.send(user)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

app.get('/users', async(req, res) => {
    try {
        var users = await User.find({}, '-password -__v') // remove unwanted props
        res.send(users)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

mongoose.connect('mongodb://dbadmin:restPass@ds159845.mlab.com:59845/restaurant', {
    useMongoClient: true,
}, (err) => {
    if (!err) {
        console.log('connected')
    } else {
        console.log('err')
    }
})

app.use('/auth', auth.router)
app.listen(3000)