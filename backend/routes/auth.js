var bcrypt = require('bcrypt-nodejs')
var User = require('../models/User.js')
var jwt = require('jwt-simple')
var express = require('express')
const utilsEmail = require('../utils/email')
var authRouter = express.Router()
const {
    check,
    validationResult
} = require('express-validator/check')
const {
    matchedData,
    sanitize
} = require('express-validator/filter')

authRouter.route('/register')
    .post([
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
    ], async (req, res) => {

        const {
            email,
            password
        } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.mapped()
            });
        }

        // email template
        const registerEmail = {
            to: email,
            subject: 'Registration',
            text: 'Welcome Aboard',
            html: `<b> Welcome Aboard </b>
        <br>
        username: ${email}
        <br>
        password: ${password}`
        }

        // check for existing email
        var user = await User.findOne({
            email: email
        })


        if (user) {
            return res.status(422).send({
                message: 'Email Already Exist'
            })
        } else {
            user = new User(req.body)
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

authRouter.route('/login')
    .post(async (req, res) => {

        const {
            email,
            password
        } = req.body

        // search db for the user email
        var user = await User.findOne({
            email: email
        })

        // validations
        if (!user) {
            return res.status(401).send({
                message: 'Email or Password Invalid'
            })
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
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
        name: user.name,
        userId: user._id
    }

    res.status(200).send({
        token: token,
        userData: userData
    })
}

var auth = {
    authRouter,
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