var bcrypt = require('bcrypt-nodejs')
var User = require('../models/User.js')
var jwt = require('jwt-simple')
var express = require('express')
const utilsEmail = require('../utils/email')
var router = express.Router()
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize} = require('express-validator/filter')

router.post('/register', [
    // name
    check('name')
    .isLength({
        min: 1
    }).withMessage('Name is required'),

    // password
    check('password', 'passwords must be at least 5 chars long and contain one number')
    .isLength({
        min: 5
    })
    .matches(/\d/),

    // email
    check('email')
    .isEmail().withMessage('must be an email')
    .trim()
    .normalizeEmail()
], async(req, res) => {
    const userData = req.body

    const name = userData.name
    const email = req.body.email

    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.mapped()
        });
    }

    // email template
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
            utilsEmail.sendEmail(registerEmail)
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