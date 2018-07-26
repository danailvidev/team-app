var express = require('express')
var authController = require('./authController.js')

var authRouter = express.Router()
const {
    check
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
    ], (req, res) => {
        authController.register(req, res)
    })

authRouter.route('/login')
    .post(async (req, res) => {
        authController.login(req, res)
    })

module.exports = authRouter