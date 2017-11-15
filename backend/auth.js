var bcrypt = require('bcrypt-nodejs')
var User = require('./models/User.js')
var jwt = require('jwt-simple')
var express = require('express')
var router = express.Router()

router.post('/register', (req, res) => {
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
router.post('/login', async(req, res) => {
    var loginData = req.body;

    // search db for the user email
    var user = await User.findOne({
        email: loginData.email
    })

    // validations
    if (!user) {
        return res.status(401).send({
            message: 'Email or Password Invalid'
        })
    }
    bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
        if (!isMatch) {
            return res.status(401).send({
                message: 'Email or Password Invalid'
            })
        } else {
            // token generate
            var payload = {}

            var token = jwt.encode(payload, '123') // 123 -> secret

            res.status(200).send({
                token
            })
        }
    })
})

module.exports = router