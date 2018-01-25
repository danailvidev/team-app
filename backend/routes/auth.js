var bcrypt = require('bcrypt-nodejs')
var User = require('../models/User.js')
var jwt = require('jwt-simple')
var express = require('express')
const email = require('../utils/email')
var router = express.Router()

router.post('/register', async (req, res) => {
    var userData = req.body

    var name = userData.name
	var email = req.body.email

    // Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	// req.checkBody('username', 'Username is required').notEmpty();
	// req.checkBody('password', 'Password is required').notEmpty();
    // req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    
    var errors = req.validationErrors() 

    if (errors) {
        return res.status(400).send({
            message: errors
        })
    }

    const registerEmail = {
        to: userData.email,
        subject: 'Registration',
        text: 'Welcome Aboard',
        html: `<b> Welcome Aboard ${userData.name} </b>
        <br>
        username: ${userData.email}
        <br>
        password: ${userData.password}`
    }
    
    // check for existing email
    var user = await User.findOne({
        email: userData.email
    })

    if (user) {
        return res.status(422).send({
            message: 'Email Already Exist'
        })
    } else {
        user = new User(userData)
    }

    user.save((err, newUser) => {
        if (err) {
            console.log('error')
            return res.status(400).send({
                message: err
            })
        } else {
            createSendToken(res, newUser)
            email.sendEmail(registerEmail)
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
            createSendToken(res, user)
        }
    })
})

function createSendToken(res, user) {
    var payload = {
        sub: user._id
    }

    var token = jwt.encode(payload, '123') // 123 -> secret
    const userData = {
        email: user.email,
        name: user.name
    }

    res.status(200).send({
        token: token,
        userData: userData
    })
}

var auth = {
    router,
    checkAuthenticated: (req, res, next) => {
        if (!req.header('authorization')) {
            return res.status(401).send({
                message: 'Unauthorized, Missing Auth Header'
            })
        }

        var token = req.header('authorization').split(' ')[1]

        var payload = jwt.decode(token, '123')

        if (!payload) {
            return res.status(401).send({
                message: 'Unauthorized, Auth Header Invalid'
            })
        }

        req.userId = payload.sub

        next()
    }
}

module.exports = auth