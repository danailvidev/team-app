var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var jwt = require('jwt-simple')
var app = express()

var User = require('./models/User.js')

var posts = [{
        message: 'hello'
    },
    {
        message: 'hi2'
    }
]

app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json())

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/register', (req, res) => {
    var userData = req.body;
    console.log(userData)
    var user = new User(userData)
    console.log(user)
    user.save((err, results) => {
        if (err) {
            console.log('error')
        } else {
            res.sendStatus(200)
        }
    })
})

app.post('/login', async(req, res) => {
    var userData = req.body;

    // search db for the user email
    var user = await User.findOne({
        email: userData.email
    })

    // validations
    if (!user) {
        return res.status(401).send({
            message: 'Email or Password Invalid'
        })
    }

    if (userData.password != user.password) {
        return res.status(401).send({
            message: 'Email or Password Invalid'
        })
    }

    // token generate
    var payload = {}

    var token = jwt.encode(payload, '123') // 123 -> secret

    res.status(200).send({
        token
    })
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
app.listen(3000)